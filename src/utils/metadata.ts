import fs from 'fs';
import path from 'path';

export function getBiomeVersion(): string | null {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const version =
      packageJson.devDependencies?.['@biomejs/biome'];

    return version ? version.replace(/^[^\d]*/, '') : null;
  } catch (error) {
    console.error('Failed to read package.json:', error);
    return null;
  }
}

export function getBiomeSchemaUrl() {
  return `https://biomejs.dev/schemas/${getBiomeVersion()}/schema.json`
}

export function getDefaultConfiguration() {
  return {
    '$schema': getBiomeSchemaUrl(),
    files: {
      ignoreUnknown: true,
      ignore: ['node_modules', 'dist']
    },
    linter: {
      enabled: true,
      ignore: ['node_modules', 'dist'],
      rules: {
        recommended: true,
      }
    },
    formatter: {
      enabled: true,
      formatWithErrors: true,
      ignore: ['node_modules', 'dist']
    },
    organizeImports: {
      enabled: true,
      ignore: ['node_modules', 'dist']
    },
    javascript: {
      parser: {
        unsafeParameterDecoratorsEnabled: true,
      },
      formatter: {
        enabled: true,
        trailingCommas: 'all',
        arrowParentheses: 'always',

      },
      linter: {
        enabled: true,
      },
    },
    json: {
      parser: {
        allowComments: true,
        allowTrailingCommas: false,
      },
      formatter: {
        enabled: true,
      },
      linter: {
        enabled: true,
      }
    },
    css: {
      formatter: {
        enabled: true,
      },
      linter: {
        enabled: true,
      }
    }
  }
}