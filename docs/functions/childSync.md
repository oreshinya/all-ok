[**all-ok v0.1.1**](../README.md) • **Docs**

***

# Function: childSync()

> **childSync**\<`TData`, `TChild`, `TContext`\>(`pick`: (`data`: `TData`) => `TChild`, `validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TChild`, `TContext`\>): [`ChildSync`](../type-aliases/ChildSync.md)\<`TData`, `TContext`\>

Delegate synchronous check to descendants.

```ts
import * as aok from 'all-ok';

type User = { name: string, age: number };

aok.childSync(
  (user: User) => user.age,
  [
    aok.checkSync(
      (age: number) => age % 2 === 0,
      "age",
      "It should be even.",
    ),
    aok.checkSync(
      (age: number) => age === 2,
      "age",
      "It should be 2."
    ),
  ],
);
```

## Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `TChild` |
| `TContext` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `pick` | (`data`: `TData`) => `TChild` |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TChild`, `TContext`\> |

## Returns

[`ChildSync`](../type-aliases/ChildSync.md)\<`TData`, `TContext`\>
