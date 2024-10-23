[**all-ok**](../README.md) • **Docs**

***

[all-ok](../README.md) / runAsync

# Function: runAsync()

> **runAsync**\<`TData`\>(`validation`, `data`, `options`): `Promise`\<[`Result`](../type-aliases/Result.md)\>

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

## Type Parameters

• **TData**

## Parameters

• **validation**: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`, `undefined`\>

• **data**: `TData`

• **options**: [`Options`](../type-aliases/Options.md) = `{}`

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\>

## Defined in

[validation.ts:377](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/validation.ts#L377)
