import { Command } from 'commander';
import { installDependencies } from "./utils/install";
import Logger from "./utils/logger";
import { getDefaultConfiguration } from "./utils/metadata";
import { askIndentStyle, askIndentWidth, askQuoteStyles, askSemicolon, checkIfUsingGit, Wizard } from "./utils/wizard";

const program = new Command();

async function main() {
  await installDependencies();

  const result = await Wizard.pipeline(
    getDefaultConfiguration(), 
    [
      checkIfUsingGit,
      askIndentStyle,
      askIndentWidth,
      askQuoteStyles,
      askSemicolon,
    ]
  );

  await Wizard.generate(result);
  Logger.success('Code Guideline successfully generated!');
}

program
  .name('code-guideline')
  .description('CLI to generate a Biome guideline config')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new Biome config')
  .action(async () => {
    await main();
  });

program.parse();