## ✨ Features

- Detects your package manager automatically (npm, pnpm, yarn, bun).
- Installs necessary dependencies (`@biomejs/biome`).
- Guides you through formatting and linting setup.
- Generates a complete `biome.json` configuration file.
- Optionally updates your `package.json` with a lint script.

## 🚀 Installation

You can run it directly without installing globally:

```bash
npx @code-guideline/biomejs init
```

(Ensure you have Node.js installed.)

## 📖 Usage

```bash
npx @code-guideline/biomejs init
```

This will:

1. Install `@biomejs/biome` if not installed.
2. Ask a few setup questions (indentation, quotes, semicolons).
3. Create or update `biome.json` at the project root.
4. Optionally add a `lint` script to your `package.json`.

## 🛠 Requirements

- Node.js >= 16
- Internet access to install dependencies

## 📦 Development

Clone the repository and run:

```bash
pnpm install
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
