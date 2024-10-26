[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Function: childAsync()

> **childAsync**\<`TData`, `TChild`, `TContext`\>(`pick`: (`data`: `TData`) => `TChild`, `validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TChild`, `TContext`\>): [`ChildAsync`](../type-aliases/ChildAsync.md)\<`TData`, `TContext`\>

Delegate asynchronous check to descendants.

```ts
import * as aok from 'all-ok';

type User = { name: string, age: number };

aok.childAsync(
  (user: User) => user.age,
  [
    aok.checkAsync(
      async (age: number) => {
        const remoteAge = await Promise.resolve(2);
        return age === remoteAge;
      },
      "age",
      "It should be equal to remote number.",
    ),
    aok.checkSync(
      (age: number) => age % 2 === 0,
      "age",
      "It should be even.",
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
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TChild`, `TContext`\> |

## Returns

[`ChildAsync`](../type-aliases/ChildAsync.md)\<`TData`, `TContext`\>
