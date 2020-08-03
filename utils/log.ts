import chalk from 'chalk';

export function error(error: string): void {
  console.error(chalk.red(`${error}`));
}

export function warning(message: string): void {
  console.warn(chalk.yellow(`${message}`));
}

export function log(message: string, color = 'green'): void {
  console.log(chalk[color](`${message}`));
}