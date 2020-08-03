/* eslint-disable @typescript-eslint/no-var-requires */
import * as program from 'commander';

program
  .version(require('../package.json').version, '-v, --version')

program
  .command('init <args> [other...]')
  .alias('i') // 别名
  .usage('<args> [other...]') // 用法
  .description('description for command')  // 描述
  .option('-t, --test [options]', 'description' ,'default value')
  .action((args, other, cmd) => {
    console.log(process.argv);
    console.log(args, 'args');
    console.log(other, 'other');
    console.log(cmd.test, 'test');
  });

program.parse(process.argv);