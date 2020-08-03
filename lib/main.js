"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const program = require("commander");
const path = require("path");

program
  .version(require('../package.json').version, '-v, --version');
program
  .command('init')
  .alias('i') // 别名
  .action(() => {
    const workPath = process.cwd();
    console.log(workPath, 'workPath');
    const root = path.parse(workPath);
    console.log(root, 'root');
    const p = path.join(workPath, 'node_modules');
    console.log(p, 'p');
    const a = path.dirname(workPath);
    console.log(a, 'a');
    const b = path.dirname(__filename);
    console.log(b, 'b');
    const c = path.join(a, 'node_modules');
    console.log(c, 'c');
    console.log(__filename, '__filename');
    console.log(process.argv);
  });
program.parse(process.argv);
