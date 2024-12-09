[**all-ok**](../README.md)

***

# Type Alias: Result\<TData\>

> **Result**\<`TData`\>: \{ `brand`: \<`TBrandName`\>(`brand`: `TBrandName`) => `TData` & [`Brand`](Brand.md)\<`TBrandName`\>; `data`: `TData`; `ok`: `true`; \} \| \{ `errors`: [[`ErrorInfo`](ErrorInfo.md)\<`string`\>, `...ErrorInfo<string>[]`]; `ok`: `false`; \}

Validation result type.

## Type Parameters

| Type Parameter |
| ------ |
| `TData` |
