export type ErrorInfo<TLabel> = { label: TLabel; message: string };

export type Result =
  | { ok: true }
  | {
      ok: false;
      errors: [ErrorInfo<string>, ...ErrorInfo<string>[]];
    };

export function toResult(errors: Array<ErrorInfo<string>>): Result {
  return (errors.length <= 0 ? { ok: true } : { ok: false, errors }) as Result;
}
