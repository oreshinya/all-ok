[**all-ok**](../README.md)

***

# Function: runAsync()

> **runAsync**\<`TData`\>(`validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\>, `data`: `TData`, `options`: [`Options`](../type-aliases/Options.md)): `Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>

Run asynchronous validations.

```ts
import * as aok from 'all-ok';

type Data = {
  name: string;
  age: number;
};

const validation = [
  aok.mapAsync(
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

| Type Parameter |
| ------ |
| `TData` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TData`\> |
| `data` | `TData` |
| `options` | [`Options`](../type-aliases/Options.md) |

## Returns

`Promise`\<[`Result`](../type-aliases/Result.md)\<`TData`\>\>
