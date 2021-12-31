# awesome-markdown



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute  | Description                                            | Type            | Default     |
| --------------- | ---------- | ------------------------------------------------------ | --------------- | ----------- |
| `markdown`      | `markdown` | The original markdown text to be parsed and displayed. | `string`        | `undefined` |
| `parserOptions` | --         | The options for markdown parser.                       | `MarkedOptions` | `undefined` |


## Events

| Event            | Description                                                                                                                                                                                  | Type                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `markdownParsed` | Occurs when the markdown is parsed.   In event detail, _result_ is the parsed HTML string  and _replaceResult_ is a callback that receives a new HTML string to replace the original result. | `CustomEvent<{ result: string; replaceResult: (result: string) => void; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
