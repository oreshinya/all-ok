[**all-ok v0.3.0**](../README.md) • **Docs**

***

# Function: checkAsync()

## checkAsync(fn, label, message)

> **checkAsync**\<`TLabel`, `TData`\>(`fn`: [`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\>, `label`: `TLabel`, `message`: `string`): [`CheckAsync`](../type-aliases/CheckAsync.md)\<`TLabel`, [`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\>\>

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

| Type Parameter |
| ------ |
| `TLabel` *extends* `string` |
| `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\> |
| `label` | `TLabel` |
| `message` | `string` |

### Returns

[`CheckAsync`](../type-aliases/CheckAsync.md)\<`TLabel`, [`FnAsync`](../-internal-/type-aliases/FnAsync.md)\<`TData`\>\>

## checkAsync(fn, label, message)

> **checkAsync**\<`TLabel`, `TData`, `TContext`\>(`fn`: [`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\>, `label`: `TLabel`, `message`: `string`): [`CheckAsync`](../type-aliases/CheckAsync.md)\<`TLabel`, [`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\>\>

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

| Type Parameter |
| ------ |
| `TLabel` *extends* `string` |
| `TData` |
| `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\> |
| `label` | `TLabel` |
| `message` | `string` |

### Returns

[`CheckAsync`](../type-aliases/CheckAsync.md)\<`TLabel`, [`FnAsyncWithContext`](../-internal-/type-aliases/FnAsyncWithContext.md)\<`TData`, `TContext`\>\>
