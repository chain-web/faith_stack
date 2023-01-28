import { cac } from 'cac';
import chalk from 'chalk';
import { version } from '../../../package.json';
import { builder } from './builder.js';
const cli = cac('sk-builder');

export interface BuildOption {
  output?: string;
  watch?: boolean;
}

cli
  .command('build [contract]')
  .option('--output <path>', `[string] output file`)
  .option('-w, --watch', `watch file change to build`)
  .example((bin) => {
    return bin;
  })
  .action(async (input: string, opt: BuildOption) => {
    try {
      await builder(input, opt);
    } catch (e: { stack: string }) {
      chalk.red(`error when build contract:\n${e.stack}`);
      process.exit(1);
    }
  });

cli.help();
cli.version(version);

cli.parse();
