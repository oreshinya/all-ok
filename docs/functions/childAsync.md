[**all-ok**](../README.md) • **Docs**

***

[all-ok](../README.md) / childAsync

# Function: childAsync()

> **childAsync**\<`TData`, `TChild`, `TContext`\>(`pick`, `validation`): [`ChildAsync`](../type-aliases/ChildAsync.md)\<`TData`, `TContext`\>

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

• **TData**

• **TChild**

• **TContext**

## Parameters

• **pick**

• **validation**: [`ValidationAsync`](../type-aliases/ValidationAsync.md)\<`TChild`, `TContext`\>

## Returns

[`ChildAsync`](../type-aliases/ChildAsync.md)\<`TData`, `TContext`\>

## Defined in

[validation.ts:219](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/validation.ts#L219)
