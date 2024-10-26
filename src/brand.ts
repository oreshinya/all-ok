export declare const BrandKey: unique symbol;

export type BrandName = string | number | symbol;

export type Brand<TBrandName extends BrandName> = {
  [BrandKey]: { [TName in TBrandName]: TName };
};
