/* eslint-disable @typescript-eslint/no-var-requires */
import * as program from 'commander';

program
  .version(require('../package.json').version, '-v, --version')

program
  .command('init')
  .alias('i') // 别名
  .action(() => {
    console.log(process.argv);
  });

program.parse(process.argv);