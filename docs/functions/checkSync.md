[**all-ok**](../README.md) • **Docs**

***

[all-ok](../README.md) / checkSync

# Function: checkSync()

## checkSync(fn, label, message)

> **checkSync**\<`TData`\>(`fn`, `label`, `message`): [`CheckSync`](../type-aliases/CheckSync.md)\<[`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>\>

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

• **TData**

### Parameters

• **fn**: [`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>

• **label**: `string`

• **message**: `string`

### Returns

[`CheckSync`](../type-aliases/CheckSync.md)\<[`FnSync`](../-internal-/type-aliases/FnSync.md)\<`TData`\>\>

### Defined in

[check-sync.ts:39](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/check-sync.ts#L39)

## checkSync(fn, label, message)

> **checkSync**\<`TData`, `TContext`\>(`fn`, `label`, `message`): [`CheckSync`](../type-aliases/CheckSync.md)\<[`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>\>

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

• **TData**

• **TContext**

### Parameters

• **fn**: [`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>

• **label**: `string`

• **message**: `string`

### Returns

[`CheckSync`](../type-aliases/CheckSync.md)\<[`FnSyncWithContext`](../-internal-/type-aliases/FnSyncWithContext.md)\<`TData`, `TContext`\>\>

### Defined in

[check-sync.ts:65](https://github.com/oreshinya/all-ok/blob/dfff127c5eb58a58e8edbe24045bd413de99450a/src/check-sync.ts#L65)
