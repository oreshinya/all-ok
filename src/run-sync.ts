import type { Result } from "./result";
import { toResult } from "./result";
import type { Options, ValidationSync } from "./validation";
import { processSync } from "./validation";

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
 *   aok.mapSync(
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
): Result<TData> {
  const errors = processSync(validation, data, context, options);
  return toResult(data, errors);
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
 *   aok.mapSync(
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
): Result<TData> {
  return runSyncWithContext(validation, data, undefined, options);
}
