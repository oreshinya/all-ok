import type { ErrorInfo } from "./result";

export type CheckAsyncAll<TData, TContext> = CheckAsync<
  FnAsyncAll<TData, TContext>
>;

export type CheckAsync<TFnAync> = {
  type: "CheckAsync";
  fn: TFnAync;
  error: ErrorInfo;
};

type FnAsyncAll<TData, TContext> =
  | FnAsync<TData>
  | FnAsyncWithContext<TData, TContext>;
type FnAsync<TData> = (data: TData) => Promise<boolean>;
type FnAsyncWithContext<TData, TContext> = (
  data: TData,
  context: TContext,
) => Promise<boolean>;

export function checkAsync<TData>(
  fn: FnAsync<TData>,
  label: string,
  message: string,
): CheckAsync<FnAsync<TData>>;
export function checkAsync<TData, TContext>(
  fn: FnAsyncWithContext<TData, TContext>,
  label: string,
  message: string,
): CheckAsync<FnAsyncWithContext<TData, TContext>>;
export function checkAsync<TData, TContext>(
  fn: FnAsyncAll<TData, TContext>,
  label: string,
  message: string,
): CheckAsync<FnAsyncAll<TData, TContext>> {
  return { type: "CheckAsync", fn, error: { label, message } };
}
