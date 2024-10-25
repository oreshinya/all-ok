import type { CheckAsyncAll } from "./check-async";
import type { CheckSyncAll } from "./check-sync";
import type { Result } from "./result";
import { toResult } from "./result";

export type ValidationSync<TData, TContext = unknown> = Array<
  CheckSyncAll<TData, TContext> | ChildSync<TData, TContext>
>;

export type ValidationAsync<TData, TContext = unknown> = Array<
  | CheckSyncAll<TData, TContext>
  | CheckAsyncAll<TData, TContext>
  | ChildSync<TData, TContext>
  | ChildAsync<TData, TContext>
>;

export type Options = {
  /**
   * If you set abortEarly to true, the runner immediately abort the validation after finding the first error.
   */
  abortEarly?: boolean;
};

export type ChildSync<TData, TContext> = {
  type: "ChildSync";
  fn: (data: TData, context: TContext, options: Options) => Result;
};

/**
 * Delegate synchronous check to descendants.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type User = { name: string, age: number };
 *
 * aok.childSync(
 *   (user: User) => user.age,
 *   [
 *     aok.checkSync(
 *       (age: number) => age % 2 === 0,
 *       "age",
 *       "It should be even.",
 *     ),
 *     aok.checkSync(
 *       (age: number) => age === 2,
 *       "age",
 *       "It should be 2."
 *     ),
 *   ],
 * );
 * ```
 */
export function childSync<TData, TChild, TContext>(
  pick: (data: TData) => TChild,
  validation: ValidationSync<TChild, TContext>,
): ChildSync<TData, TContext> {
  return {
    type: "ChildSync",
    fn: (data, context, options) => {
      return runSyncWithContext(validation, pick(data), context, options);
    },
  };
}

/**
 * Run synchronous validations with your any context.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type Data = {
 *   name: string;
 *   age: number;
 * };
 *
 * const validation = [
 *   aok.childSync(
 *     (data: Data) => data.age,
 *     [
 *       aok.checkSync(
 *         (data: number, context: string) => String(data) !== context,
 *         "age",
 *         "It shouldn't equal to context.",
 *       ),
 *       aok.checkSync(
 *         (data: number) => data % 2 === 0,
 *         "age",
 *         "It should be even.",
 *       ),
 *       aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
 *     ],
 *   ),
 *   aok.checkSync(
 *     (data: Data) => data.name !== "",
 *     "name",
 *     "It shouldn't be empty.",
 *   ),
 * ];
 *
 * aok.runSyncWithContext(
 *   validation,
 *   { name: "", age: 1 },
 *   "1",
 * );
 * ```
 */
export function runSyncWithContext<TData, TContext>(
  validation: ValidationSync<TData, TContext>,
  data: TData,
  context: TContext,
  options: Options = {},
): Result {
  const errors = [];
  for (const leaf of validation) {
    switch (leaf.type) {
      case "CheckSync": {
        const result = leaf.fn(data, context);
        if (!result) {
          errors.push(leaf.error);
          if (options.abortEarly) {
            return toResult(errors);
          }
        }
        break;
      }
      default: {
        const result = leaf.fn(data, context, options);
        if (!result.ok) {
          errors.push(...result.errors);
          if (options.abortEarly) {
            return toResult(errors);
          }
        }
        break;
      }
    }
  }
  return toResult(errors);
}

/**
 * Run synchronous validations.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type Data = {
 *   name: string;
 *   age: number;
 * };
 *
 * const validation = [
 *   aok.childSync(
 *     (data: Data) => data.age,
 *     [
 *       aok.checkSync(
 *         (data: number) => data % 2 === 0,
 *         "age",
 *         "It should be even.",
 *       ),
 *       aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
 *     ],
 *   ),
 *   aok.checkSync(
 *     (data: Data) => data.name !== "",
 *     "name",
 *     "It shouldn't be empty.",
 *   ),
 * ];
 *
 * aok.runSync(
 *   validation,
 *   { name: "", age: 1 }
 * );
 * ```
 */
export function runSync<TData>(
  validation: ValidationSync<TData>,
  data: TData,
  options: Options = {},
): Result {
  return runSyncWithContext(validation, data, undefined, options);
}

export type ChildAsync<TData, TContext> = {
  type: "ChildAsync";
  fn: (data: TData, context: TContext, options: Options) => Promise<Result>;
};

/**
 * Delegate asynchronous check to descendants.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type User = { name: string, age: number };
 *
 * aok.childAsync(
 *   (user: User) => user.age,
 *   [
 *     aok.checkAsync(
 *       async (age: number) => {
 *         const remoteAge = await Promise.resolve(2);
 *         return age === remoteAge;
 *       },
 *       "age",
 *       "It should be equal to remote number.",
 *     ),
 *     aok.checkSync(
 *       (age: number) => age % 2 === 0,
 *       "age",
 *       "It should be even.",
 *     ),
 *   ],
 * );
 * ```
 */
export function childAsync<TData, TChild, TContext>(
  pick: (data: TData) => TChild,
  validation: ValidationAsync<TChild, TContext>,
): ChildAsync<TData, TContext> {
  return {
    type: "ChildAsync",
    fn: (data, context, options) => {
      return runAsyncWithContext(validation, pick(data), context, options);
    },
  };
}

/**
 * Run asynchronous validations with your any context.
 *
 * ```ts
 * import * as aok from 'all-ok';
 * import { type Tx, db } from "~/db";
 *
 * type Data = {
 *   name: string;
 *   age: number;
 * };
 *
 * const validation = [
 *   aok.childAsync(
 *     (data: Data) => data.age,
 *     [
 *       aok.checkAsync(
 *         async (data: number, context: Tx) => {
 *           const remoteNumber = await context.find();
 *           return data === remoteNumber;
 *         },
 *         "age",
 *         "It should be equal to db number.",
 *       ),
 *       aok.checkSync(
 *         (data: number) => data % 2 === 0,
 *         "age",
 *         "It should be even.",
 *       ),
 *       aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
 *     ],
 *   ),
 *   aok.checkSync(
 *     (data: Data) => data.name !== "",
 *     "name",
 *     "It shouldn't be empty.",
 *   ),
 * ];
 *
 * await db.transaction(async (tx) => {
 *   await aok.runAsyncWithContext(
 *     validation,
 *     { name: "", age: 1 },
 *     tx,
 *   );
 * });
 * ```
 */
export async function runAsyncWithContext<TData, TContext>(
  validation: ValidationAsync<TData, TContext>,
  data: TData,
  context: TContext,
  options: Options = {},
): Promise<Result> {
  const errors = [];
  for (const leaf of validation) {
    switch (leaf.type) {
      case "CheckAsync": {
        const result = await leaf.fn(data, context);
        if (!result) {
          errors.push(leaf.error);
          if (options.abortEarly) {
            return toResult(errors);
          }
        }
        break;
      }
      case "ChildAsync": {
        const result = await leaf.fn(data, context, options);
        if (!result.ok) {
          errors.push(...result.errors);
          if (options.abortEarly) {
            return toResult(errors);
          }
        }
        break;
      }
      case "CheckSync": {
        const result = leaf.fn(data, context);
        if (!result) {
          errors.push(leaf.error);
          if (options.abortEarly) {
            return toResult(errors);
          }
        }
        break;
      }
      default: {
        const result = leaf.fn(data, context, options);
        if (!result.ok) {
          errors.push(...result.errors);
          if (options.abortEarly) {
            return toResult(errors);
          }
        }
        break;
      }
    }
  }
  return toResult(errors);
}

/**
 * Run asynchronous validations.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type Data = {
 *   name: string;
 *   age: number;
 * };
 *
 * const validation = [
 *   aok.childAsync(
 *     (data: Data) => data.age,
 *     [
 *       aok.checkAsync(
 *         async (data: number) => {
 *           const remoteNumber = await Promise.resolve(2);
 *           return data === remoteNumber;
 *         },
 *         "age",
 *         "It should be equal to remote number.",
 *       ),
 *       aok.checkSync(
 *         (data: number) => data % 2 === 0,
 *         "age",
 *         "It should be even.",
 *       ),
 *       aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
 *     ],
 *   ),
 *   aok.checkSync(
 *     (data: Data) => data.name !== "",
 *     "name",
 *     "It shouldn't be empty.",
 *   ),
 * ];
 *
 * await aok.runAsync(
 *   validation,
 *   { name: "", age: 1 }
 * );
 * ```
 */
export async function runAsync<TData>(
  validation: ValidationAsync<TData>,
  data: TData,
  options: Options = {},
): Promise<Result> {
  return runAsyncWithContext(validation, data, undefined, options);
}
