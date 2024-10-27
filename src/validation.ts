import type { CheckAsyncAll } from "./check-async";
import type { CheckSyncAll } from "./check-sync";
import type { ErrorInfo } from "./result";

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
  fn: (
    data: TData,
    context: TContext,
    options: Options,
  ) => Array<ErrorInfo<string>>;
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
      return processSync(validation, pick(data), context, options);
    },
  };
}

export function processSync<TData, TContext>(
  validation: ValidationSync<TData, TContext>,
  data: TData,
  context: TContext,
  options: Options,
): Array<ErrorInfo<string>> {
  const errors = [];
  for (const leaf of validation) {
    switch (leaf.type) {
      case "CheckSync": {
        const result = leaf.fn(data, context);
        if (!result) {
          errors.push(leaf.error);
          if (options.abortEarly) {
            return errors;
          }
        }
        break;
      }
      default: {
        const leafErrors = leaf.fn(data, context, options);
        if (leafErrors.length > 0) {
          errors.push(...leafErrors);
          if (options.abortEarly) {
            return errors;
          }
        }
        break;
      }
    }
  }
  return errors;
}

export type ChildAsync<TData, TContext> = {
  type: "ChildAsync";
  fn: (
    data: TData,
    context: TContext,
    options: Options,
  ) => Promise<Array<ErrorInfo<string>>>;
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
      return processAsync(validation, pick(data), context, options);
    },
  };
}

export async function processAsync<TData, TContext>(
  validation: ValidationAsync<TData, TContext>,
  data: TData,
  context: TContext,
  options: Options,
): Promise<Array<ErrorInfo<string>>> {
  const errors = [];
  for (const leaf of validation) {
    switch (leaf.type) {
      case "CheckAsync": {
        const result = await leaf.fn(data, context);
        if (!result) {
          errors.push(leaf.error);
          if (options.abortEarly) {
            return errors;
          }
        }
        break;
      }
      case "ChildAsync": {
        const leafErrors = await leaf.fn(data, context, options);
        if (leafErrors.length > 0) {
          errors.push(...leafErrors);
          if (options.abortEarly) {
            return errors;
          }
        }
        break;
      }
      case "CheckSync": {
        const result = leaf.fn(data, context);
        if (!result) {
          errors.push(leaf.error);
          if (options.abortEarly) {
            return errors;
          }
        }
        break;
      }
      default: {
        const leafErrors = leaf.fn(data, context, options);
        if (leafErrors.length > 0) {
          errors.push(...leafErrors);
          if (options.abortEarly) {
            return errors;
          }
        }
        break;
      }
    }
  }
  return errors;
}
