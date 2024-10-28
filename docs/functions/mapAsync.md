[**all-ok**](../README.md) • **Docs**

***

# Function: mapAsync()

> **mapAsync**\<`TData`, `UData`, `TContext`\>(`map`: (`data`: `TData`) => `UData` \| (`data`: `TData`, `context`: `TContext`) => `UData`, `validation`: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`UData`, `TContext`\>): [`MapAsync`](../type-aliases/MapAsync.md)\<`TData`, `TContext`\>

Delegate asynchronous check to descendants.

```ts
import * as aok from 'all-ok';

type User = { name: string, age: number };

aok.mapAsync(
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

aok.mapAsync(
  (data: Partial<User>, current: User) => ({...current, ...data}),
  [
    aok.checkAsync(
      async (user: User) => {
        if (user.name !== "tom") {
          return true;
        }
        const remoteAge = await Promise.resolve(9);
        return user.age === remoteAge;
      },
      "age",
      "Tom's age should be remote age.",
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
| `validation` | [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`UData`, `TContext`\> |

## Returns

[`MapAsync`](../type-aliases/MapAsync.md)\<`TData`, `TContext`\>
