[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Function: runSyncWithContext()

Run synchronous validations with your any context.

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
        (data: number, context: string) => String(data) !== context,
        "age",
        "It shouldn't equal to context.",
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

aok.runSyncWithContext(
  validation,
  { name: "", age: 1 },
  "1",
);
```

## runSyncWithContext(validation, data, context)

> **runSyncWithContext**\<`TData`, `TContext`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`): [`Result`](../type-aliases/Result.md)\<`TData`\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |

### Returns

[`Result`](../type-aliases/Result.md)\<`TData`\>

## runSyncWithContext(validation, data, context, options)

> **runSyncWithContext**\<`TData`, `TContext`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`, `options`: [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md)): [`Result`](../type-aliases/Result.md)\<`TData`\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |
| `options` | [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md) |

### Returns

[`Result`](../type-aliases/Result.md)\<`TData`\>

## runSyncWithContext(validation, data, context, options)

> **runSyncWithContext**\<`TData`, `TContext`, `TBrandName`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`, `options`: [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\>): [`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |
| `TBrandName` *extends* [`BrandName`](../type-aliases/BrandName.md) |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |
| `options` | [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\> |

### Returns

[`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>
