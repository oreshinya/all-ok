[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Function: runAsyncWithContext()

Run asynchronous validations with your any context.

```ts
import * as aok from 'all-ok';
import { type Tx, db } from "~/db";

type Data = {
  name: string;
  age: number;
};

const validation = [
  aok.childAsync(
    (data: Data) => data.age,
    [
      aok.checkAsync(
        async (data: number, context: Tx) => {
          const remoteNumber = await context.find();
          return data === remoteNumber;
        },
        "age",
        "It should be equal to db number.",
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

await db.transaction(async (tx) => {
  await aok.runAsyncWithContext(
    validation,
    { name: "", age: 1 },
    tx,
  );
});
```

## runAsyncWithContext(validation, data, context)

> **runAsyncWithContext**\<`TData`, `TContext`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

## runAsyncWithContext(validation, data, context, options)

> **runAsyncWithContext**\<`TData`, `TContext`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`, `options`: [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md)): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |
| `options` | [`NonBrandedOptions`](../-internal-/type-aliases/NonBrandedOptions.md) |

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

## runAsyncWithContext(validation, data, context, options)

> **runAsyncWithContext**\<`TData`, `TContext`, `TBrandName`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`, `options`: [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\>): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>\>

### Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |
| `TBrandName` *extends* [`BrandName`](../type-aliases/BrandName.md) |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |
| `options` | [`BrandedOptions`](../-internal-/type-aliases/BrandedOptions.md)\<`TBrandName`\> |

### Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData` & [`Brand`](../type-aliases/Brand.md)\<`TBrandName`\>\>\>
