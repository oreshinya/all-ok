[**all-ok v0.1.0**](../README.md) • **Docs**

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

## Defined in

[validation.ts:54](https://github.com/oreshinya/all-ok/blob/7ad66c9c41377006d7fe2b9941a247cf80c6127d/src/validation.ts#L54)
