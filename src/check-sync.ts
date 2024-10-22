import type { ErrorInfo } from "./result";

export type CheckSyncAll<TData, TContext> = CheckSync<
  FnSyncAll<TData, TContext>
>;

export type CheckSync<TFnSync> = {
  type: "CheckSync";
  fn: TFnSync;
  error: ErrorInfo;
};

type FnSyncAll<TData, TContext> =
  | FnSync<TData>
  | FnSyncWithContext<TData, TContext>;
type FnSync<TData> = (data: TData) => boolean;
type FnSyncWithContext<TData, TContext> = (
  data: TData,
  context: TContext,
) => boolean;

export function checkSync<TData>(
  fn: FnSync<TData>,
  label: string,
  message: string,
): CheckSync<FnSync<TData>>;
export function checkSync<TData, TContext>(
  fn: FnSyncWithContext<TData, TContext>,
  label: string,
  message: string,
): CheckSync<FnSyncWithContext<TData, TContext>>;
export function checkSync<TData, TContext>(
  fn: FnSyncAll<TData, TContext>,
  label: string,
  message: string,
): CheckSync<FnSyncAll<TData, TContext>> {
  return { type: "CheckSync", fn, error: { label, message } };
}
