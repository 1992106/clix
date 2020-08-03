import * as fs from 'fs';

export function isFileNameValid(filename: string): boolean {
  return /\/|\|<|>|\*|\?/.test(filename);
}

export function isFileNameExcessLimit(filename: string): boolean {
  return filename.length > 255;
}

export function isFileNameExists(file: string): boolean {
  return fs.existsSync(file);
}