/**
 * Creator's Note -
 * 
 * We believe in making this project accessible and enjoyable for all contributors.
 * To maintain this spirit, we kindly ask that you include clear comments in your code
 * that explain your contribution and implementation decisions.
 * 
 * Good comments help future contributors (including yourself!) understand:
 * - Why certain decisions were made
 * - How different parts of the code work together
 * - Any non-obvious implications of the implementation
 * 
 * Thank you for helping keep this project maintainable and contributor-friendly! 
 */

import fs from 'fs-extra';
import { execSync } from 'child_process';
import chalk from 'chalk';
import path from 'path';

async function setupPlaceholderImage() {
  const projectRoot = process.cwd();
  const packageRoot = path.join(__dirname, '..', '..');
  
  // Define possible asset directories
  const publicDir = path.join(projectRoot, 'public');
  const assetsDir = path.join(projectRoot, 'assets');
  
  // Determine target directory (prefer public over assets)
  let targetDir = '';
  if (fs.existsSync(publicDir)) {
    targetDir = publicDir;
  } else if (fs.existsSync(assetsDir)) {
    targetDir = assetsDir;
  } else {
    // Create public directory if neither exists
    targetDir = publicDir;
    await fs.ensureDir(targetDir);
    console.log(chalk.blue('Created public directory for assets'));
  }

  // Copy placeholder.svg
  const sourcePath = path.join(packageRoot, 'assets', 'placeholder.svg');
  const targetPath = path.join(targetDir, 'placeholder.svg');

  try {
    await fs.copy(sourcePath, targetPath, { overwrite: false });
    console.log(chalk.green('✓ Placeholder image added to', path.relative(projectRoot, targetDir)));
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log(chalk.yellow('Placeholder image already exists, skipping...'));
    } else {
      throw error;
    }
  }
}

export async function init() {
  try {
    // Check if we're in a Next.js project
    if (!fs.existsSync('package.json')) {
      throw new Error('Not in a valid Next.js project directory. Make sure to run this command in your project root.');
    }

    const pkg = await fs.readJson('package.json');
    if (!pkg.dependencies?.next) {
      throw new Error('This command must be run in a Next.js project.');
    }

    // Check if components.json exists
    if (!fs.existsSync('components.json')) {
      console.log(chalk.yellow('components.json not found. Installing and initializing shadcn...'));
      
      try {
        // First ensure required packages are installed
        console.log(chalk.blue('Installing required dependencies...'));
        execSync('npm install -D @types/node autoprefixer postcss tailwindcss @types/react @types/react-dom --legacy-peer-deps', {
          stdio: 'inherit'
        });

        // Install shadcn CLI
        console.log(chalk.blue('Installing shadcn...'));
        execSync('npm install -D @shadcn/ui --legacy-peer-deps', {
          stdio: 'inherit'
        });

        // Initialize shadcn with the correct command
        console.log(chalk.blue('Initializing shadcn...'));
        execSync('npx shadcn@latest init -d', {
          stdio: 'inherit',
          env: {
            ...process.env,
            npm_config_legacy_peer_deps: 'true'
          }
        });

        console.log(chalk.green('✓ Successfully initialized shadcn!'));
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to initialize shadcn: ${error.message}\nTry running these commands manually:\n1. npm install -D @shadcn/ui --legacy-peer-deps\n2. npx shadcn@latest init -d`);
        }
        throw new Error('Failed to initialize shadcn. Try running \'npx shadcn@latest init -d\' manually.');
      }
    } else {
      console.log(chalk.green('✓ shadcn is already initialized!'));
    }

    // Setup placeholder image
    console.log(chalk.blue('\nSetting up placeholder image...'));
    await setupPlaceholderImage();
    
    console.log(chalk.green('\n✓ Tumble UI initialization complete!'));
  } catch (error) {
    throw error;
  }
}