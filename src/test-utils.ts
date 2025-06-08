/**
 * Helper function to normalize CLI output for comparison
 * Handles whitespace differences between actual and expected output
 */
export function normalizeOutput(output: string): string {
  return output
    .trim()
    .replace(/\s*\n\s*/g, '\n')
    .replace(/^\s*"|"\s*$/g, '');
}
