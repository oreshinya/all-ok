import * as v from "valibot";

import * as aok from "./";

type Data = {
  name: string;
  age: number;
};

suite("validation sync", () => {
  const validation = [
    aok.childSync(
      (data: Data) => data.age,
      [
        aok.checkSync(
          (data: number) => data % 2 === 0,
          "age",
          "It should be even.",
        ),
        aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
      ],
    ),
    aok.checkSync(
      (data: Data) => data.name !== "",
      "name",
      "It shouldn't be empty.",
    ),
  ];

  suite("Failure", () => {
    test("Without abortEarly", () => {
      const result = aok.runSync(validation, { name: "", age: 1 });
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        { label: "age", message: "It should be even." },
        { label: "age", message: "It should be 2." },
        { label: "name", message: "It shouldn't be empty." },
      ]);
    });

    test("With abortEarly", () => {
      const result = aok.runSync(
        validation,
        { name: "", age: 1 },
        { abortEarly: true },
      );
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        { label: "age", message: "It should be even." },
      ]);
    });
  });

  test("Success", () => {
    const result = aok.runSync(validation, { name: "tom", age: 2 });
    assert.isOk(result.ok);
  });
});

suite("validation sync with context", () => {
  const validation = [
    aok.childSync(
      (data: Data) => data.age,
      [
        aok.checkSync(
          (data: number, context: string) => String(data) !== context,
          "age",
          "It shouldn't equal to context.",
        ),
        aok.checkSync(
          (data: number) => data % 2 === 0,
          "age",
          "It should be even.",
        ),
        aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
      ],
    ),
    aok.checkSync(
      (data: Data) => data.name !== "",
      "name",
      "It shouldn't be empty.",
    ),
  ];

  suite("Failure", () => {
    test("Without abortEarly", () => {
      const result = aok.runSyncWithContext(
        validation,
        { name: "", age: 1 },
        "1",
      );
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        { label: "age", message: "It shouldn't equal to context." },
        { label: "age", message: "It should be even." },
        { label: "age", message: "It should be 2." },
        { label: "name", message: "It shouldn't be empty." },
      ]);
    });

    test("With abortEarly", () => {
      const result = aok.runSyncWithContext(
        validation,
        { name: "", age: 1 },
        "1",
        {
          abortEarly: true,
        },
      );
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        { label: "age", message: "It shouldn't equal to context." },
      ]);
    });
  });

  test("Success", () => {
    const result = aok.runSyncWithContext(
      validation,
      { name: "tom", age: 2 },
      "100",
    );
    assert.isOk(result.ok);
  });
});

suite("validation async", () => {
  const validation = [
    aok.childAsync(
      (data: Data) => data.age,
      [
        aok.checkAsync(
          async (data: number) => {
            const remoteNumber = await Promise.resolve(2);
            return data === remoteNumber;
          },
          "age",
          "It should be equal to remote number.",
        ),
        aok.checkSync(
          (data: number) => data % 2 === 0,
          "age",
          "It should be even.",
        ),
        aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
      ],
    ),
    aok.checkSync(
      (data: Data) => data.name !== "",
      "name",
      "It shouldn't be empty.",
    ),
  ];

  suite("Failure", () => {
    test("Without abortEarly", async () => {
      const result = await aok.runAsync(validation, { name: "", age: 1 });
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        {
          label: "age",
          message: "It should be equal to remote number.",
        },
        { label: "age", message: "It should be even." },
        { label: "age", message: "It should be 2." },
        { label: "name", message: "It shouldn't be empty." },
      ]);
    });

    test("With abortEarly", async () => {
      const result = await aok.runAsync(
        validation,
        { name: "", age: 1 },
        { abortEarly: true },
      );
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        {
          label: "age",
          message: "It should be equal to remote number.",
        },
      ]);
    });
  });

  test("Success", async () => {
    const result = await aok.runAsync(validation, { name: "tom", age: 2 });
    assert.isOk(result.ok);
  });
});

suite("validation async with context", () => {
  const tx = {
    find: async () => Promise.resolve(2),
  };

  const validation = [
    aok.childAsync(
      (data: Data) => data.age,
      [
        aok.checkAsync(
          async (data: number, context: typeof tx) => {
            const remoteNumber = await context.find();
            return data === remoteNumber;
          },
          "age",
          "It should be equal to db number.",
        ),
        aok.checkSync(
          (data: number) => data % 2 === 0,
          "age",
          "It should be even.",
        ),
        aok.checkSync((data: number) => data === 2, "age", "It should be 2."),
      ],
    ),
    aok.checkSync(
      (data: Data) => data.name !== "",
      "name",
      "It shouldn't be empty.",
    ),
  ];

  suite("Failure", () => {
    test("Without abortEarly", async () => {
      const result = await aok.runAsyncWithContext(
        validation,
        { name: "", age: 1 },
        tx,
      );
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        { label: "age", message: "It should be equal to db number." },
        { label: "age", message: "It should be even." },
        { label: "age", message: "It should be 2." },
        { label: "name", message: "It shouldn't be empty." },
      ]);
    });

    test("With abortEarly", async () => {
      const result = await aok.runAsyncWithContext(
        validation,
        { name: "", age: 1 },
        tx,
        {
          abortEarly: true,
        },
      );
      assert(!result.ok);
      assert.deepEqual(result.errors, [
        { label: "age", message: "It should be equal to db number." },
      ]);
    });
  });

  test("Success", async () => {
    const result = await aok.runAsyncWithContext(
      validation,
      { name: "tom", age: 2 },
      tx,
    );
    assert.isOk(result.ok);
  });
});

suite("Combine with valibot", () => {
  const checkPresent = aok.checkSync(
    (data: Data) => data.name !== "",
    "name",
    "It shouldn't be empty.",
  );

  const checkEven = aok.checkSync(
    (data: number) => data % 2 === 0,
    "age",
    "It should be even.",
  );

  const Schema = v.pipe(
    v.object({
      name: v.string(),
      age: v.pipe(v.number(), v.check(checkEven.fn, checkEven.error.message)),
    }),
    v.forward(v.check(checkPresent.fn, checkPresent.error.message), [
      checkPresent.error.label,
    ]),
  );

  test("Parse failure", () => {
    const result = v.safeParse(Schema, { name: "", age: 1 });
    assert(!result.success);
    assert.deepEqual(
      result.issues.map((i) => ({
        message: i.message,
        label: i.path?.[0]?.key,
      })),
      [
        { label: "age", message: "It should be even." },
        { label: "name", message: "It shouldn't be empty." },
      ],
    );
  });

  test("Parse success", () => {
    const result = v.safeParse(Schema, { name: "tom", age: 2 });
    assert(result.success);
    assert.deepEqual(result.output, { name: "tom", age: 2 });
  });
});
