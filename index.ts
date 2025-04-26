// Main entry point for the pascal-tokenizer package
export { tokenizePascal } from './tokenizer';

// Export types for better TypeScript integration
export interface PascalToken {
  type: string;
  value: any;
}