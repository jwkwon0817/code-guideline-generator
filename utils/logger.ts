import chalk from 'chalk';

class Logger {
  static info(message: string) {
    console.log(`${chalk.cyan('ℹ️  [INFO]')} ${message}`);
  }

  static warn(message: string) {
    console.warn(`${chalk.hex('#FFA500')('⚠️  [WARN]')} ${message}`);
  }

  static error(message: string) {
    console.error(`${chalk.red('❌ [ERROR]')} ${message}`);
  }

  static success(message: string) {
    console.log(`${chalk.green('✅ [SUCCESS]')} ${message}`);
  }
}

export default Logger;