[**all-ok**](../README.md)

***

# Function: mapSync()

> **mapSync**\<`TData`, `UData`, `TContext`\>(`map`: (`data`: `TData`) => `UData` \| (`data`: `TData`, `context`: `TContext`) => `UData`, `validation`: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`UData`, `TContext`\>): [`MapSync`](../type-aliases/MapSync.md)\<`TData`, `TContext`\>

Delegate synchronous check to mapped data.

```ts
import * as aok from 'all-ok';

type User = { name: string, age: number };

aok.mapSync(
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

aok.mapSync(
  (data: Partial<User>, current: User) => ({...current, ...data}),
  [
    aok.checkSync(
      (user: User) => {
        return user.name !== "tom" || user.age === 9;
      },
      "age",
      "Tom's age should be 9.",
    ),
  ],
);
```

## Type Parameters

| Type Parameter |
| ------ |
| `TData` |
| `UData` |
| `TContext` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `map` | (`data`: `TData`) => `UData` \| (`data`: `TData`, `context`: `TContext`) => `UData` |
| `validation` | [`ValidationSync`](../type-aliases/ValidationSync.md)\<`UData`, `TContext`\> |

## Returns

[`MapSync`](../type-aliases/MapSync.md)\<`TData`, `TContext`\>
