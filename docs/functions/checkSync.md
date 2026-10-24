[**all-ok**](../README.md)

***

# Function: checkSync()

## Call Signature

> **checkSync**\<`TLabel` *extends* `string`, `TData`\>(`fn`: [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>, `label`: `TLabel`, `message`: `string`): [`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>\>

Define synchronous check.

```ts
import * as aok from 'all-ok';

type User = { name: string, age: number };

aok.checkSync(
  (user: User) => {
    return user.name !== "";
  },
  "name",
  "The name shouldn't be empty."
);
```

### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tlabel"></a> `TLabel` *extends* `string` |
| <a id="type-parameter-tdata"></a> `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\> |
| `label` | `TLabel` |
| `message` | `string` |

### Returns

[`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>\>

## Call Signature

> **checkSync**\<`TLabel` *extends* `string`, `TData`, `TContext`\>(`fn`: [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>, `label`: `TLabel`, `message`: `string`): [`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>\>

Define synchronous check with your any context.

```ts
import * as aok from 'all-ok';

type Reservation = { startAt: Date, endAt: Date };

aok.checkSync(
  (reservation: Reservation, context: Reservation) => {
    const isPassedStartAt = context.startAt < new Date();
    return (
      !isPassedStartAt ||
      reservation.startAt.getTime() === context.startAt.getTime()
    );
  },
  "startAt",
  "The startAt can't be changed after startAt."
);
```

### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tlabel-1"></a> `TLabel` *extends* `string` |
| <a id="type-parameter-tdata-1"></a> `TData` |
| <a id="type-parameter-tcontext"></a> `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\> |
| `label` | `TLabel` |
| `message` | `string` |

### Returns

[`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>\>
