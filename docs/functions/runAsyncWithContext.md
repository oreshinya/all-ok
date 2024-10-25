[**all-ok v0.1.0**](../README.md) • **Docs**

***

# Function: runAsyncWithContext()

> **runAsyncWithContext**\<`TData`, `TContext`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`, `options`: [`Options`](../type-aliases/Options.md)): `Promise`\<[`Result`](../type-aliases/Result.md)\>

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

## Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |
| `options` | [`Options`](../type-aliases/Options.md) |

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\>

## Defined in

[validation.ts:279](https://github.com/oreshinya/all-ok/blob/7ad66c9c41377006d7fe2b9941a247cf80c6127d/src/validation.ts#L279)
