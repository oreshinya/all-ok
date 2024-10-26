import type { Result } from "./result";
import { toResult } from "./result";
import type { Options, ValidationAsync } from "./validation";
import { processAsync } from "./validation";

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
  const errors = await processAsync(validation, data, context, options);
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
