<h1 align="center">all-ok</h1>
<p align="center">Validate anything simply and type-safely.</p>
<p align="center">
<a href="https://github.com/oreshinya/all-ok/actions/workflows/check.yml"><img src="https://img.shields.io/github/actions/workflow/status/oreshinya/all-ok/check.yml?branch=main&logo=github&style=flat-square" /></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square" /></a>
<a href="https://npmjs.org/package/all-ok" rel="nofollow"><img src="https://img.shields.io/npm/v/all-ok.svg?style=flat-square" /></a>
</p>

## Installation

```
$ npm install all-ok
```

## Introduction

It's essential to maintain type information obtained through validation and narrow down types appropriately when parsing data from external boundaries using schema validation libraries such as Zod, Valibot, and others.

However, in server-side applications, teams may differ in how strictly they validate and narrow down types before reaching domain logic, as the decoding happens at the outer layer while domain logic sits deeper in the application.

This package helps you adjust the balance of validation approaches in your server-side code. At external boundaries, you can parse data into suitably strict types using schema validation libraries, while using this package to perform validation in your domain logic.

For full-stack TypeScript applications, you can also partially reuse the validation code defined with this package in your frontend implementations that use schema validation libraries.

## Usage

Here are some basic usage examples. The API Document is 👉 [here](https://github.com/oreshinya/all-ok/tree/main/docs).

```ts
import * as aok from 'all-ok';
import * as v from 'valibot';

import { db } from '~/db';

type User = {
  name: string;
};

const checkUser = aok.checkSync(
  (user: User) => user.name.length > 3,
  "name",
  "The name should be more than 3 characters."
);

const checkNameLength = aok.checkSync(
  (name: string) => name.length < 16,
  "name",
  "The name should be less than 16 characters."
);

const checkNameUniq = aok.checkAsync(
  async (name: string) => {
    const u = await db.findUser(name);
    return !u;
  },
  "name",
  "The name should be unique."
);

const userValidation = [
  checkUser,
  aok.mapAsync(
    (user: User) => user.name,
    [
      checkNameLength,
      checkNameUniq
    ]
  ),
];

const result = await aok.runAsync(userValidation, { name: "foo" });

if (!result.ok) {
  console.log(result.errors);
  // =>
  // [
  //   { label: "name", message: "The name should be more than 3 characters." },
  //   { label: "name", message: "The name should be unique." }
  // ]
}

// With valibot

const UserSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.check(checkNameLength.fn, checkNameLength.error.message),
    ),
  }),
  v.forward(
    v.check(checkUser.fn, checkUser.error.message),
    [ checkUser.error.label ]
  ),
);
```

Run validation with transaction. You can pass any object as context to the runner.

```ts
import * as aok from 'all-ok';

import { type Database, db } from '~/db';

type Seat = {
  userId: number;
  eventId: number;
};

const checkSeatReserved = aok.checkAsync(
  async (seat: Seat, tx: Database) => {
    const s = await tx.findSeat(seat.userId, seat.eventId);
    return !s;
  },
  "event",
  "You have reserved this event already."
);

const checkSeatAvailable = aok.checkAsync(
  async (seat: Seat, tx: Database) => {
    const e = await tx.findEventWithLock(seat.eventId);
    return e.isAvailable;
  },
  "event",
  "There are no seats available for this event."
);

const seatValidation = [
  checkSeatReserved,
  checkSeatAvailable,
];

await db.transaction(async (tx) => {
  const result = await aok.runAsyncWithContext(
    seatValidation,
    { userId: 1, eventId: 1 },
    tx
  );

  if (!result.ok) {
    console.log(result.errors);
  }
});
```
