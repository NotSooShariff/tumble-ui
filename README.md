# tumble-ui (beta)

[![Issues](https://img.shields.io/github/issues/NotSooShariff/tumble-ui)](https://github.com/NotSooShariff/tumble-ui/issues)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/NotSooShariff/tumble-ui#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NotSooShariff/tumble-ui/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Known Vulnerabilities](https://snyk.io/test/github/NotSooShariff/tumble-ui/badge.svg)](https://snyk.io/test/github/NotSooShariff/tumble-ui)

> A collection of ready-to-use React components built on top of shadcn/ui

## 🚀 Features

- Pre-built sections and layouts
- TypeScript support
- Built on shadcn/ui components
- Easy installation process
- Fully customizable

## 📦 Install

```sh
npx tumble-ui init
```

## 🔧 Usage

1. Initialize shadcn/ui in your project:

```sh
npx tumble-ui init
```

2. Add components:

```sh
# Add specific components
npx tumble-ui add hero-simple footer

# Add all components
npx tumble-ui add all
```

3. List available components:

```sh
npx tumble-ui add
```

## ⚙️ Configuration

Components are installed based on your `components.json` configuration:

```json
{
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

**Note** - This is generated automatically during intialisation command

## 🤝 Contributing

Contributions, issues and feature requests are welcome.
Feel free to check [issues page](https://github.com/NotSooShariff/tumble-ui/issues).

## 📝 License

MIT © [NotSooShariff](https://github.com/NotSooShariff)