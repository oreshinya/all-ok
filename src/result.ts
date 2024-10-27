export type ErrorInfo<TLabel extends string> = {
  label: TLabel;
  message: string;
};

export declare const BrandKey: unique symbol;

export type BrandName = string | number | symbol;

/**
 * Brand type.
 */
export type Brand<TBrandName extends BrandName> = {
  [BrandKey]: { [T in TBrandName]: T };
};

/**
 * Validation result type.
 */
export type Result<TData> =
  | {
      ok: true;
      data: TData;
      brand: <TBrandName extends BrandName>(
        brand: TBrandName,
      ) => TData & Brand<TBrandName>;
    }
  | {
      ok: false;
      errors: [ErrorInfo<string>, ...ErrorInfo<string>[]];
    };

export function toResult<TData>(
  data: TData,
  errors: Array<ErrorInfo<string>>,
): Result<TData> {
  if (errors.length > 0) {
    return {
      ok: false,
      errors: errors as [ErrorInfo<string>, ...ErrorInfo<string>[]],
    };
  }

  return {
    ok: true,
    data,
    brand: <TBrandName extends BrandName>(_brand: TBrandName) => {
      return data as TData & Brand<TBrandName>;
    },
  };
}
