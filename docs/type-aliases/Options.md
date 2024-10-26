[**all-ok v0.2.0**](../README.md) • **Docs**

***

# Type Alias: Options\<TBrandName\>

> **Options**\<`TBrandName`\>: \{`abortEarly`: `boolean`;`brand`: `TBrandName`; \}

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TBrandName` *extends* [`BrandName`](BrandName.md) \| `unknown` | `unknown` |

## Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `abortEarly`? | `boolean` | If you set abortEarly to true, the runner immediately abort the validation after finding the first error. |
| `brand`? | `TBrandName` | If you set brand, you can brand the output type of a result with the passed brand. |
