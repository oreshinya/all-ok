[**all-ok**](../README.md) • **Docs**

***

[all-ok](../README.md) / checkAsync

# Function: checkAsync()

## checkAsync(fn, label, message)

> **checkAsync**\<`TData`\>(`fn`, `label`, `message`): [`CheckAsync`](../type-aliases/CheckAsync.md)\<[`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\>\>

Define asynchronous check.

```ts
import * as aok from 'all-ok';
import { getUserNameUsed } from '~/api';

type User = { name: string, age: number };

aok.checkAsync(
  async (user: User) => {
    return !(await getUserNameUsed(user.name);
  },
  "name",
  "The name is used already."
);
```

### Type Parameters

• **TData**

### Parameters

• **fn**: [`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\>

• **label**: `string`

• **message**: `string`

### Returns

[`CheckAsync`](../type-aliases/CheckAsync.md)\<[`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\>\>

### Defined in

[check-async.ts:40](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/check-async.ts#L40)

## checkAsync(fn, label, message)

> **checkAsync**\<`TData`, `TContext`\>(`fn`, `label`, `message`): [`CheckAsync`](../type-aliases/CheckAsync.md)\<[`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\>\>

Define asynchronous check with your any context.

```ts
import * as aok from 'all-ok';
import { type Tx, findUserByNameWithLock } from '~/db';

type User = { name: string, age: number };

aok.checkAsync(
  async (user: User, context: Tx) => {
    return !(await findUserByNameWithLock(tx, user.name));
  },
  "name",
  "The name is used already."
);
```

### Type Parameters

• **TData**

• **TContext**

### Parameters

• **fn**: [`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\>

• **label**: `string`

• **message**: `string`

### Returns

[`CheckAsync`](../type-aliases/CheckAsync.md)\<[`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\>\>

### Defined in

[check-async.ts:63](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/check-async.ts#L63)
