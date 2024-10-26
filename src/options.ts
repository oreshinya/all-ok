import type { BrandName } from "./brand";

export type Options<TBrandName extends BrandName | unknown = unknown> = {
  /**
   * If you set abortEarly to true, the runner immediately abort the validation after finding the first error.
   */
  abortEarly?: boolean;
  /**
   * If you set brand, you can brand the output type of a result with the passed brand.
   */
  brand?: TBrandName;
};

export type NonBrandedOptions = {
  abortEarly?: boolean;
};

export type BrandedOptions<TBrandName extends BrandName> = {
  abortEarly?: boolean;
  brand: TBrandName;
};
