import fs from 'fs/promises';
import inquirer from 'inquirer';
import path from 'path';

export async function exportToFile(data: object) {
  const stringifiedData = JSON.stringify(data, null, 2);
  const outputPath = path.join(process.cwd(), 'biome.json');

  try {
    const fileExists = await fs.access(outputPath).then(() => true).catch(() => false);

    if (fileExists) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'biome.json already exists. Overwrite?',
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log('❌ Export canceled.');
        return;
      }
    }

    await fs.writeFile(outputPath, stringifiedData);
    console.log('✅ biome.json has been successfully created.');
  } catch (error) {
    console.error('Failed to export biome.json:', error);
  }
}

export async function changePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  try {
    const packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonRaw);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (!packageJson.scripts.lint) {
      const { shouldAddLint } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldAddLint',
          message: 'No "lint" script found. Do you want to add "lint": "biome check --fix"?',
          default: true,
        },
      ]);

      if (shouldAddLint) {
        packageJson.scripts.lint = 'biome check --fix';
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ "lint" script has been added to package.json.');
      } else {
        console.log('❌ Skipped adding "lint" script.');
      }
    } else {
      console.log('ℹ️  "lint" script already exists in package.json.');
    }
  } catch (error) {
    console.error('Failed to modify package.json:', error);
  }
}