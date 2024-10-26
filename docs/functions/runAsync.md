[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Function: runAsync()

Run asynchronous validations.

```ts
import * as aok from 'all-ok';

type Data = {
  name: string;
  age: number;
};

const validation = [
  aok.childAsync(
    (data: Data) => data.age,
    [
      aok.checkAsync(
        async (data: number) => {
          const remoteNumber = await Promise.resolve(2);
          return data === remoteNumber;
        },
        "age",
        "It should be equal to remote number.",
      ),
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

await aok.runAsync(
  validation,
  { name: "", age: 1 }
);
```

## runAsync(validation, data)

> **runAsync**\<`TData`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\>, `data`: `TData`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\> |
| `data` | `TData` |

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

## runAsync(validation, data, options)

> **runAsync**\<`TData`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\>, `data`: `TData`, `options`: [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md)): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\> |
| `data` | `TData` |
| `options` | [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md) |

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

## runAsync(validation, data, options)

> **runAsync**\<`TData`, `TBrandName`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\>, `data`: `TData`, `options`: [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\>): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TBrandName` *extends* [`BrandName`](../type-aliases/BrandName.md) |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\> |
| `data` | `TData` |
| `options` | [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\> |

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>\>
