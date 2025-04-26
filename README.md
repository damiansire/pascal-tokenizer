# Pascal Tokenizer

A simple and efficient tokenizer for the Pascal programming language, written in TypeScript.

## Installation

Install the package using npm:

```bash
npm install pascal-tokenizer
```

## Usage

### Basic Usage

You can import the tokenizePascal function and optionally the PascalToken and TokenType types

_Input example:_

```typescript
import { tokenizePascal, PascalToken, TokenType } from "pascal-tokenizer";

const pascalCode = `
program HelloWorld;
begin
  writeln('Hello, World!'); // Example comment
end.
`;

// Tokenize the code (comments skipped by default)
const tokens: PascalToken[] = tokenizePascal(pascalCode);
console.log(tokens);

// Example: Find the first keyword token
const firstKeyword = tokens.find((token) => token.type === "KEYWORD"); // You can use the imported TokenType for type checking

// Tokenize including comments
const tokensWithComments = tokenizePascal(pascalCode, false);
console.log(tokensWithComments);
```

_Default output:_

```typescript
[
  { type: "KEYWORD", value: "program" },
  { type: "IDENTIFIER", value: "HelloWorld" },
  { type: "DELIMITER_SEMICOLON", value: ";" },
  { type: "KEYWORD", value: "begin" },
  { type: "IDENTIFIER", value: "writeln" },
  { type: "DELIMITER_LPAREN", value: "(" },
  { type: "STRING_LITERAL", value: "Hello, World!" },
  { type: "DELIMITER_RPAREN", value: ")" },
  { type: "DELIMITER_SEMICOLON", value: ";" },
  { type: "KEYWORD", value: "end" },
  { type: "DELIMITER_DOT", value: "." },
  { type: "EOF", value: "" },
];
```

_Output with comments:_

```typescript
[
  { type: "KEYWORD", value: "program" },
  { type: "IDENTIFIER", value: "HelloWorld" },
  { type: "DELIMITER_SEMICOLON", value: ";" },
  { type: "KEYWORD", value: "begin" },
  { type: "IDENTIFIER", value: "writeln" },
  { type: "DELIMITER_LPAREN", value: "(" },
  { type: "STRING_LITERAL", value: "Hello, World!" },
  { type: "DELIMITER_RPAREN", value: ")" },
  { type: "DELIMITER_SEMICOLON", value: ";" },
  { type: "COMMENT_LINE", value: "// Example comment" },
  { type: "KEYWORD", value: "end" },
  { type: "DELIMITER_DOT", value: "." },
  { type: "EOF", value: "" },
];
```

### Including Comments

By default, comments are skipped. If you want to include comments in the token stream:

```typescript
const tokens = tokenizePascal(pascalCode, false); // false = don't skip comments
```

## Token Structure

Each token has the following structure:

```typescript
interface PascalToken {
  type: TokenType;
  value: string;
}
```

## Token Types

The tokenizer recognizes the following token types:

| Token Type (`TokenType`) | Symbol / Example in Pascal           | Description                                |
| :----------------------- | :----------------------------------- | :----------------------------------------- |
| **Comments**             |                                      |                                            |
| `COMMENT_BLOCK_BRACE`    | `{ ... }`                            | Comment delimited by braces                |
| `COMMENT_STAR`           | `(* ... *)`                          | Comment delimited by parenthesis/asterisk  |
| `COMMENT_LINE`           | `// ...`                             | Single-line comment (Delphi/FPC style)     |
| **Operators**            |                                      |                                            |
| `OPERATOR_ASSIGN`        | `:=`                                 | Assignment                                 |
| `OPERATOR_LESS_EQUAL`    | `<=`                                 | Less than or equal to                      |
| `OPERATOR_GREATER_EQUAL` | `>=`                                 | Greater than or equal to                   |
| `OPERATOR_NOT_EQUAL`     | `<>`                                 | Not equal to                               |
| `OPERATOR_RANGE`         | `..`                                 | Range (used in subranges, case)            |
| `OPERATOR_PLUS`          | `+`                                  | Addition                                   |
| `OPERATOR_MINUS`         | `-`                                  | Subtraction                                |
| `OPERATOR_MULTIPLY`      | `*`                                  | Multiplication                             |
| `OPERATOR_DIVIDE`        | `/`                                  | Division (real)                            |
| `OPERATOR_EQUAL`         | `=`                                  | Equality (comparison)                      |
| `OPERATOR_LESS`          | `<`                                  | Less than                                  |
| `OPERATOR_GREATER`       | `>`                                  | Greater than                               |
| `OPERATOR_POINTER`       | `^`                                  | Pointer dereference / Pointer type         |
| `OPERATOR_ADDRESSOF`     | `@`                                  | Memory address (@ operator)                |
| **Delimiters**           |                                      |                                            |
| `DELIMITER_SEMICOLON`    | `;`                                  | Semicolon                                  |
| `DELIMITER_COMMA`        | `,`                                  | Comma                                      |
| `DELIMITER_DOT`          | `.`                                  | Dot (end of program, record access)        |
| `DELIMITER_LPAREN`       | `(`                                  | Left parenthesis                           |
| `DELIMITER_RPAREN`       | `)`                                  | Right parenthesis                          |
| `DELIMITER_LBRACKET`     | `[`                                  | Left bracket (arrays)                      |
| `DELIMITER_RBRACKET`     | `]`                                  | Right bracket (arrays)                     |
| `DELIMITER_COLON`        | `:`                                  | Colon (type declaration, labels)           |
| **Literals**             |                                      |                                            |
| `STRING_LITERAL`         | `'Hello'`, `'A'`                     | String literal (without quotes in `value`) |
| `BOOLEAN_LITERAL`        | `true`, `false`                      | Boolean value (case-insensitive)           |
| `NUMBER_REAL`            | `1.23`, `-0.5`, `.5`                 | Number with decimal part                   |
| `NUMBER_INTEGER`         | `100`, `0`, `-42`                    | Integer number                             |
| **Others**               |                                      |                                            |
| `KEYWORD`                | (See list below)                     | Language reserved word                     |
| `IDENTIFIER`             | `myVariable`, `Counter`, `TMyObject` | User-defined name                          |
| `EOF`                    |                                      | End Of File marker (internal)              |
| `WHITESPACE`             | Can be used for external consumption | Unused.                                    |

**Keywords (`KEYWORD`) Currently Recognized (according to `tokenizer.ts`):**

- `program`
- `const`
- `var`
- `begin`
- `end`
- `if`
- `then`
- `else`
- `while`
- `do`
- `for`
- `to`
- `downto`
- `repeat`
- `until`
- `case`
- `of`
- `record`
- `array`
- `procedure`
- `function`
- `type`
- `integer`
- `real`
- `char`
- `string`
- `boolean`
- `uses`
- `label`
- `goto`

_(Note: `true` and `false` are specifically handled as `BOOLEAN_LITERAL` in your code, even though they might be in an initial keyword list)._

## Considerations

Please note that if you have writeln('Hello, World!'), the resulting token will be { type: "STRING_LITERAL", value: "Hello, World!" }. The single quotes (') will not be included directly in the value. This is intentional, so that you can render it on the screen as desired later on.

## License

MIT
