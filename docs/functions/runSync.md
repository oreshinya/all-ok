[**all-ok**](../README.md) • **Docs**

***

[all-ok](../README.md) / runSync

# Function: runSync()

> **runSync**\<`TData`\>(`validation`, `data`, `options`): [`Result`](../type-aliases/Result.md)

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

## Type Parameters

• **TData**

## Parameters

• **validation**: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `undefined`\>

• **data**: `TData`

• **options**: [`Options`](../type-aliases/Options.md) = `{}`

## Returns

[`Result`](../type-aliases/Result.md)

## Defined in

[validation.ts:178](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/validation.ts#L178)
