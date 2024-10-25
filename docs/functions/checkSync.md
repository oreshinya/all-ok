[**all-ok v0.1.0**](../README.md) • **Docs**

***

# Function: checkSync()

## checkSync(fn, label, message)

> **checkSync**\<`TLabel`, `TData`\>(`fn`: [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>, `label`: `TLabel`, `message`: `string`): [`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>\>

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
| `TLabel` *extends* `string` |
| `TData` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\> |
| `label` | `TLabel` |
| `message` | `string` |

### Returns

[`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>\>

### Defined in

[check-sync.ts:40](https://github.com/oreshinya/all-ok/blob/7ad66c9c41377006d7fe2b9941a247cf80c6127d/src/check-sync.ts#L40)

## checkSync(fn, label, message)

> **checkSync**\<`TLabel`, `TData`, `TContext`\>(`fn`: [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>, `label`: `TLabel`, `message`: `string`): [`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>\>

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
| `TLabel` *extends* `string` |
| `TData` |
| `TContext` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\> |
| `label` | `TLabel` |
| `message` | `string` |

### Returns

[`CheckSync`](../type-aliases/CheckSync.md)\<`TLabel`, [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>\>

### Defined in

[check-sync.ts:66](https://github.com/oreshinya/all-ok/blob/7ad66c9c41377006d7fe2b9941a247cf80c6127d/src/check-sync.ts#L66)
