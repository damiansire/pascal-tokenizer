// Example usage of the pascal-tokenizer package

import { tokenizePascal } from './index';

// Sample Pascal code
const pascalCode = `
program Example;
var
  x, y: integer;
  s: string;
begin
  x := 10;
  y := 20;
  s := 'Hello, Pascal!';
  
  if x < y then
    writeln(s)
  else
    writeln('x is greater than or equal to y');
    
  { This is a comment }
end.
`;

// Tokenize the code
console.log('Tokenizing with comments skipped (default):');
const tokensWithoutComments = tokenizePascal(pascalCode);
console.log(JSON.stringify(tokensWithoutComments, null, 2));

console.log('\nTokenizing with comments included:');
const tokensWithComments = tokenizePascal(pascalCode, false);
console.log(JSON.stringify(tokensWithComments, null, 2));