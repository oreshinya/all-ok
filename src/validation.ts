import type { CheckAsyncAll } from "./check-async";
import type { CheckSyncAll } from "./check-sync";
import type { ErrorInfo } from "./result";

export type ValidationSync<TData, TContext = unknown> = Array<
  CheckSyncAll<TData, TContext> | MapSync<TData, TContext>
>;

export type ValidationAsync<TData, TContext = unknown> = Array<
  | CheckSyncAll<TData, TContext>
  | CheckAsyncAll<TData, TContext>
  | MapSync<TData, TContext>
  | MapAsync<TData, TContext>
>;

export type Options = {
  /**
   * If you set abortEarly to true, the runner immediately abort the validation after finding the first error.
   */
  abortEarly?: boolean;
};

export type MapSync<TData, TContext> = {
  type: "MapSync";
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
 * aok.mapSync(
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
export function mapSync<TData, UData, TContext>(
  map: ((data: TData) => UData) | ((data: TData, context: TContext) => UData),
  validation: ValidationSync<UData, TContext>,
): MapSync<TData, TContext> {
  return {
    type: "MapSync",
    fn: (data, context, options) => {
      return processSync(validation, map(data, context), context, options);
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

export type MapAsync<TData, TContext> = {
  type: "MapAsync";
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
 * aok.mapAsync(
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
export function mapAsync<TData, UData, TContext>(
  map: ((data: TData) => UData) | ((data: TData, context: TContext) => UData),
  validation: ValidationAsync<UData, TContext>,
): MapAsync<TData, TContext> {
  return {
    type: "MapAsync",
    fn: (data, context, options) => {
      return processAsync(validation, map(data, context), context, options);
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
      case "MapAsync": {
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
