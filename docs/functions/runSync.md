[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Function: runSync()

> **runSync**\<`TData`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\>, `data`: `TData`, `options`: [`Options`](../type-aliases/Options.md)): [`Result`](../type-aliases/Result.md)\<`TData`\>

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

| Type Parameter |
| ------ |
| `TData` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`\> |
| `data` | `TData` |
| `options` | [`Options`](../type-aliases/Options.md) |

## Returns

[`Result`](../type-aliases/Result.md)\<`TData`\>
