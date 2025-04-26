// tokenizer.test.ts
import { tokenizePascal, PascalToken } from "../src/index"; // Asegúrate que la ruta sea correcta

describe("tokenizePascal", () => {
  // Test básico con palabras clave e identificadores
  it("should tokenize basic program structure", () => {
    const code = "program HelloWorld; begin end.";
    const expectedTokens: PascalToken[] = [
      { type: "KEYWORD", value: "program" },
      { type: "IDENTIFIER", value: "HelloWorld" },
      { type: "DELIMITER_SEMICOLON", value: ";" },
      { type: "KEYWORD", value: "begin" },
      { type: "KEYWORD", value: "end" },
      { type: "DELIMITER_DOT", value: "." },
      { type: "EOF", value: "" },
    ];
    expect(tokenizePascal(code)).toEqual(expectedTokens);
  });

  // Test con números
  it("should tokenize integers and real numbers", () => {
    const code = "var count: integer; price: real; begin count := 10; price := 99.5; end.";
    // Solo verificaremos los números y el EOF para simplificar
    const tokens = tokenizePascal(code);
    const numberTokens = tokens.filter((t) => t.type.startsWith("NUMBER_") || t.type === "EOF");
    const expectedNumberTokens: PascalToken[] = [
      { type: "NUMBER_INTEGER", value: "10" },
      { type: "NUMBER_REAL", value: "99.5" },
      { type: "EOF", value: "" },
    ];
    expect(numberTokens).toEqual(expectedNumberTokens);
  });

  /*
  Please note that if you have writeln('Hello, World!'), the resulting token will be { type: "STRING_LITERAL", value: "Hello, World!" }. The single quotes (') will not be included directly in the value. This is intentional, so that you can render it on the screen as desired later on.
  */
  it("should tokenize string literals", () => {
    const code = "writeln('Hello, World!');";
    const tokens = tokenizePascal(code);
    const stringToken = tokens.find((t) => t.type === "STRING_LITERAL");
    expect(stringToken).toEqual({ type: "STRING_LITERAL", value: "Hello, World!" });
  });

  // Test con booleanos
  it("should tokenize boolean literals (case-insensitive)", () => {
    const code = "isValid := TRUE; isReady := false;";
    const tokens = tokenizePascal(code);
    const booleanTokens = tokens.filter((t) => t.type === "BOOLEAN_LITERAL");
    expect(booleanTokens).toEqual([
      { type: "BOOLEAN_LITERAL", value: "TRUE" }, // Mantiene la capitalización original
      { type: "BOOLEAN_LITERAL", value: "false" },
    ]);
  });

  // Test con operadores
  it("should tokenize various operators", () => {
    const code = "a := b + c * (d - e) / f;";
    const tokens = tokenizePascal(code);
    const operatorTokens = tokens.filter((t) => t.type.startsWith("OPERATOR_") || t.type.startsWith("DELIMITER_"));
    expect(operatorTokens).toEqual([
      { type: "OPERATOR_ASSIGN", value: ":=" },
      { type: "OPERATOR_PLUS", value: "+" },
      { type: "OPERATOR_MULTIPLY", value: "*" },
      { type: "DELIMITER_LPAREN", value: "(" },
      { type: "OPERATOR_MINUS", value: "-" },
      { type: "DELIMITER_RPAREN", value: ")" },
      { type: "OPERATOR_DIVIDE", value: "/" },
      { type: "DELIMITER_SEMICOLON", value: ";" },
    ]);
  });

  // Test para ignorar comentarios (por defecto)
  it("should skip comments by default", () => {
    const code = `
      program Test; (* Block comment *)
      begin
        { Another comment }
        writeln('Test'); // Line comment
      end.
    `;
    const tokens = tokenizePascal(code);
    const commentTokens = tokens.filter((t) => t.type.startsWith("COMMENT_"));
    expect(commentTokens.length).toBe(0); // No debería haber tokens de comentario
    expect(tokens.find((t) => t.value === "Test")).toBeTruthy(); // Asegurarse que el resto está
  });

  // Test para incluir comentarios
  it("should include comments when skipComments is false", () => {
    const code = "{Comment1} (*Comment2*) //Comment3";
    const tokens = tokenizePascal(code, false); // skipComments = false
    expect(tokens).toEqual([
      { type: "COMMENT_BLOCK_BRACE", value: "{Comment1}" },
      { type: "COMMENT_STAR", value: "(*Comment2*)" },
      { type: "COMMENT_LINE", value: "//Comment3" },
      { type: "EOF", value: "" },
    ]);
  });

  // Test para entrada vacía
  it("should return only EOF for empty input", () => {
    const code = "";
    expect(tokenizePascal(code)).toEqual([{ type: "EOF", value: "" }]);
  });

  // Test para entrada con solo espacios/saltos de línea
  it("should return only EOF for whitespace-only input", () => {
    const code = "   \n\t  \r\n ";
    expect(tokenizePascal(code)).toEqual([{ type: "EOF", value: "" }]);
  });

  it("To complex code", () => {
    const code = `
      program MiPrimerPrograma;

      begin
        writeln('Hola, mundo!'); // Muestra un mensaje en pantalla
      end. (* El punto final es crucial! *)`;

    const tokens = tokenizePascal(code, false); // skipComments = false

    const expected = [
      { type: "KEYWORD", value: "program" },
      { type: "IDENTIFIER", value: "MiPrimerPrograma" },
      { type: "DELIMITER_SEMICOLON", value: ";" },
      { type: "KEYWORD", value: "begin" },
      { type: "IDENTIFIER", value: "writeln" },
      { type: "DELIMITER_LPAREN", value: "(" },
      { type: "STRING_LITERAL", value: "Hola, mundo!" },
      { type: "DELIMITER_RPAREN", value: ")" },
      { type: "DELIMITER_SEMICOLON", value: ";" },
      { type: "COMMENT_LINE", value: "// Muestra un mensaje en pantalla" },
      { type: "KEYWORD", value: "end" },
      { type: "DELIMITER_DOT", value: "." },
      { type: "COMMENT_STAR", value: "(* El punto final es crucial! *)" },
      { type: "EOF", value: "" },
    ];

    expect(tokens).toEqual(expected);
  });
});
