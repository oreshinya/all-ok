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

/**
 * Define asynchronous check.
 *
 * ```ts
 * import * as aok from 'all-ok';
 * import { getUserNameUsed } from '~/api';
 *
 * type User = { name: string, age: number };
 *
 * aok.checkAsync(
 *   async (user: User) => {
 *     return !(await getUserNameUsed(user.name);
 *   },
 *   "name",
 *   "The name is used already."
 * );
 * ```
 */
export function checkAsync<TData>(
  fn: FnAsync<TData>,
  label: string,
  message: string,
): CheckAsync<FnAsync<TData>>;
/**
 * Define asynchronous check with your any context.
 *
 * ```ts
 * import * as aok from 'all-ok';
 * import { type Tx, findUserByNameWithLock } from '~/db';
 *
 * type User = { name: string, age: number };
 *
 * aok.checkAsync(
 *   async (user: User, context: Tx) => {
 *     return !(await findUserByNameWithLock(tx, user.name));
 *   },
 *   "name",
 *   "The name is used already."
 * );
 * ```
 */
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
