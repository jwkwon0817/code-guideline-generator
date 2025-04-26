import { exec } from 'child_process';
import { promisify } from 'util';
import Logger from './logger';
import { getBiomeVersion } from './metadata';

const execAsync = promisify(exec);

function detectPackageManager(): 'pnpm' | 'yarn' | 'bun' | 'npm' {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith('pnpm')) return 'pnpm';
    if (userAgent.startsWith('yarn')) return 'yarn';
    if (userAgent.startsWith('bun')) return 'bun';
  }

  return 'npm';
}

export async function installDependencies() {
  try {
    const packageManager = detectPackageManager();
    Logger.info(`Detected package manager: ${packageManager}`);
    Logger.info('Installing dependencies...');

    const packageName = '@biomejs/biome';

    const installCommand = {
      pnpm: `pnpm add -D ${packageName}`,
      yarn: `yarn add -D ${packageName}`,
      bun: `bun add -d ${packageName}`,
      npm: `npm install --save-dev ${packageName}`,
    }[packageManager];

    const { stderr } = await execAsync(installCommand);

    if (stderr) Logger.error(stderr);

    Logger.success('Dependencies installed successfully.');

    Logger.info(`${getBiomeVersion()} installed.`)
  } catch (error) {
    Logger.error('Failed to install dependencies.');
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}