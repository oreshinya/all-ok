[**all-ok**](../README.md)

***

# Function: runSyncWithContext()

> **runSyncWithContext**\<`TData`, `TContext`\>(`validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\>, `data`: `TData`, `context`: `TContext`, `options`: [`Options`](../type-aliases/Options.md)): [`Result`](../type-aliases/Result.md)\<`TData`\>

Run synchronous validations with your any context.

```ts
import * as aok from 'all-ok';

type Data = {
  name: string;
  age: number;
};

const validation = [
  aok.mapSync(
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

## Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TContext` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TData`, `TContext`\> |
| `data` | `TData` |
| `context` | `TContext` |
| `options` | [`Options`](../type-aliases/Options.md) |

## Returns

[`Result`](../type-aliases/Result.md)\<`TData`\>
