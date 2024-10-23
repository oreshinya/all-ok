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

/**
 * Define synchronous check.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type User = { name: string, age: number };
 *
 * aok.checkSync(
 *   (user: User) => {
 *     return user.name !== "";
 *   },
 *   "name",
 *   "The name shouldn't be empty."
 * );
 * ```
 */
export function checkSync<TData>(
  fn: FnSync<TData>,
  label: string,
  message: string,
): CheckSync<FnSync<TData>>;
/**
 * Define synchronous check with your any context.
 *
 * ```ts
 * import * as aok from 'all-ok';
 *
 * type Reservation = { startAt: Date, endAt: Date };
 *
 * aok.checkSync(
 *   (reservation: Reservation, context: Reservation) => {
 *     const isPassedStartAt = context.startAt < new Date();
 *     return (
 *       !isPassedStartAt ||
 *       reservation.startAt.getTime() === context.startAt.getTime()
 *     );
 *   },
 *   "startAt",
 *   "The startAt can't be changed after startAt."
 * );
 * ```
 */
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
