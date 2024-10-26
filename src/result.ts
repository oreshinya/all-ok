export type ErrorInfo<TLabel> = { label: TLabel; message: string };

export type Result<TOutput> =
  | {
      ok: true;
      output: TOutput;
    }
  | {
      ok: false;
      errors: [ErrorInfo<string>, ...ErrorInfo<string>[]];
    };

export function toResult<TOutput>(
  output: TOutput,
  errors: Array<ErrorInfo<string>>,
): Result<TOutput> {
  return (
    errors.length <= 0 ? { ok: true, output } : { ok: false, errors }
  ) as Result<TOutput>;
}
