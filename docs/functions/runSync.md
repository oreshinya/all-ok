[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Function: runSync()

Run synchronous validations.

```ts
import * as aok from 'all-ok';

type Data = {
  name: string;
  age: number;
};

const validation = [
  aok.childSync(
    (data: Data) => data.age,
    [
      aok.checkSync(
        (data: number) => data % 2 === 0,
        "age",
        "It should be even.",
      ),
      aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
    ],
  ),
  aok.checkSync(
    (data: Data) => data.name !== "",
    "name",
    "It shouldn't be empty.",
  ),
];

aok.runSync(
  validation,
  { name: "", age: 1 }
);
```

## runSync(validation, data)

> **runSync**\<`TData`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\>, `data`: `TData`): [`Result`](../type-aliases/Result.md)\<`TData`\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\> |
| `data` | `TData` |

### Returns

[`Result`](../type-aliases/Result.md)\<`TData`\>

## runSync(validation, data, options)

> **runSync**\<`TData`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\>, `data`: `TData`, `options`: [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md)): [`Result`](../type-aliases/Result.md)\<`TData`\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\> |
| `data` | `TData` |
| `options` | [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md) |

### Returns

[`Result`](../type-aliases/Result.md)\<`TData`\>

## runSync(validation, data, options)

> **runSync**\<`TData`, `TBrandName`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\>, `data`: `TData`, `options`: [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\>): [`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TBrandName` *extends* [`BrandName`](../type-aliases/BrandName.md) |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\> |
| `data` | `TData` |
| `options` | [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\> |

### Returns

[`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>
