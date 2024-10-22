export type ErrorInfo = { label: string; message: string };

export type Result = { ok: true } | { ok: false; errors: Array<ErrorInfo> };

export function toResult(errors: Array<ErrorInfo>): Result {
  return errors.length <= 0 ? { ok: true } : { ok: false, errors };
}
