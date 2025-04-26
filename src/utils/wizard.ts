import fs from 'fs/promises';
import inquirer from 'inquirer';
import _ from 'lodash';
import path from 'path';
import { changePackageJson, exportToFile } from './export';
import Logger from './logger';



export async function checkIfUsingGit() {
  try {
    Logger.info('Checking if using git...');

    const gitPath = path.join(process.cwd(), '.git');

    await fs.access(gitPath);

    Logger.info('Using VCS: git');

    return {
      vcs: {
        enabled: true,
        clientKind: 'git',
      }
    };
  } catch {
    Logger.info('Not using VCS');

    return undefined;
  }
}

export async function askIndentStyle() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'indentStyle',
      message: 'Which indent style do you prefer?',
      choices: [
        { name: 'Tab', value: 'tab' },
        { name: 'Space', value: 'space' }
      ],
      default: 'tab'
    },
  ]);

  const { indentStyle } = answer;

  return {
    formatter: {
      indentStyle,
    },
    javascript: {
      formatter: {
        indentStyle,
      }
    },
    json: {
      formatter: {
        indentStyle,
      }
    },
    css: {
      formatter: {
        indentStyle,
      }
    }
  };
}

export async function askIndentWidth() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'indentWidth',
      message: 'Which indent width do you prefer?',
      choices: [
        { name: '2 spaces', value: '2' },
        { name: '4 spaces', value: '4' }
      ],
      default: '2'
    },
  ]);

  const { indentWidth } = answer;

  return {
    formatter: {
      indentWidth: Number(indentWidth),
    },
    javascript: {
      formatter: {
        indentWidth: Number(indentWidth),
      }
    },
    json: {
      formatter: {
        indentWidth: Number(indentWidth),
      }
    },
    css: {
      formatter: {
        indentWidth: Number(indentWidth),
      }
    }
  };
}

export async function askQuoteStyles() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'quoteStyle',
      message: 'Which quote style do you prefer?',
      choices: [
        { name: 'Single quote (\')', value: 'single' },
        { name: 'Double quote (")', value: 'double' }
      ],
      default: 'single'
    },
  ]);

  const { quoteStyle } = answer;

  return {
    javascript: {
      formatter: {
        quoteStyle,
      }
    },
    css: {
      formatter: {
        quoteStyle,
      }
    }
  };
}

export async function askSemicolon() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'semicolons',
      message: 'Do you want to use semicolon?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false }
      ],
      default: true
    },
  ]);

  const { semicolons } = answer;

  return {
    javascript: {
      formatter: {
        semicolons: semicolons ? 'always': 'asNeed',
      }
    }
  };
}
type WizardStep = (options: any) => Promise<Partial<any> | undefined>;

export class Wizard {
  static async pipeline(defaultOptions: any, steps: WizardStep[]) {
    let result = { ...defaultOptions };

    for (const step of steps) {
      const output = await step(result);
      
      if (output) {
        result = _.merge({}, result, output); // ✅ 깊은 병합
      }
    }

    return result;
  }

  static async generate(data: any) {
    await exportToFile(data);
    await changePackageJson();
  }
}