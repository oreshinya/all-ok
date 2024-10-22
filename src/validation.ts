import type { CheckAsyncAll } from "./check-async";
import type { CheckSyncAll } from "./check-sync";
import type { Result } from "./result";
import { toResult } from "./result";

export type ValidationSync<TData, TContext> = Array<
  CheckSyncAll<TData, TContext> | ChildSync<TData, TContext>
>;

export type ValidationAsync<TData, TContext> = Array<
  | CheckSyncAll<TData, TContext>
  | CheckAsyncAll<TData, TContext>
  | ChildSync<TData, TContext>
  | ChildAsync<TData, TContext>
>;

export type Options = {
  abortEarly?: boolean;
};

export type ChildSync<TData, TContext> = {
  type: "ChildSync";
  fn: (data: TData, context: TContext, options: Options) => Result;
};

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

export function runSync<TData>(
  validation: ValidationSync<TData, undefined>,
  data: TData,
  options: Options = {},
): Result {
  return runSyncWithContext(validation, data, undefined, options);
}

export type ChildAsync<TData, TContext> = {
  type: "ChildAsync";
  fn: (data: TData, context: TContext, options: Options) => Promise<Result>;
};

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

export async function runAsync<TData>(
  validation: ValidationAsync<TData, undefined>,
  data: TData,
  options: Options = {},
): Promise<Result> {
  return runAsyncWithContext(validation, data, undefined, options);
}
