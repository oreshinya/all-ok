import type { Brand, BrandName } from "./brand";
import type { BrandedOptions, NonBrandedOptions, Options } from "./options";
import type { Result } from "./result";
import { toResult } from "./result";
import type { ValidationSync } from "./validation";
import { processSync } from "./validation";

/**
 * @overload
 */
export function runSyncWithContext<TData, TContext>(
  validation: ValidationSync<TData, TContext>,
  data: TData,
  context: TContext,
): Result<TData>;
/**
 * @overload
 */
export function runSyncWithContext<TData, TContext>(
  validation: ValidationSync<TData, TContext>,
  data: TData,
  context: TContext,
  options: NonBrandedOptions,
): Result<TData>;
/**
 * @overload
 */
export function runSyncWithContext<
  TData,
  TContext,
  TBrandName extends BrandName,
>(
  validation: ValidationSync<TData, TContext>,
  data: TData,
  context: TContext,
  options: BrandedOptions<TBrandName>,
): Result<TData & Brand<TBrandName>>;
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
): Result<TData> {
  const errors = processSync(validation, data, context, options);
  return toResult(data, errors);
}

/**
 * @overload
 */
export function runSync<TData>(
  validation: ValidationSync<TData>,
  data: TData,
): Result<TData>;
/**
 * @overload
 */
export function runSync<TData>(
  validation: ValidationSync<TData>,
  data: TData,
  options: NonBrandedOptions,
): Result<TData>;
/**
 * @overload
 */
export function runSync<TData, TBrandName extends BrandName>(
  validation: ValidationSync<TData>,
  data: TData,
  options: BrandedOptions<TBrandName>,
): Result<TData & Brand<TBrandName>>;
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
): Result<TData> {
  return runSyncWithContext(validation, data, undefined, options);
}
