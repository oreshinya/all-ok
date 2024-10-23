[**all-ok**](../README.md) • **Docs**

***

[all-ok](../README.md) / childSync

# Function: childSync()

> **childSync**\<`TData`, `TChild`, `TContext`\>(`pick`, `validation`): [`ChildSync`](../type-aliases/ChildSync.md)\<`TData`, `TContext`\>

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

• **TData**

• **TChild**

• **TContext**

## Parameters

• **pick**

• **validation**: [`ValidationSync`](../type-aliases/ValidationSync.md)\<`TChild`, `TContext`\>

## Returns

[`ChildSync`](../type-aliases/ChildSync.md)\<`TData`, `TContext`\>

## Defined in

[validation.ts:54](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/validation.ts#L54)
