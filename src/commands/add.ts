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

interface Dependencies {
  dependencies: string[];
}

interface ComponentsConfig {
  aliases: {
    components: string;
    ui: string;
  };
}

function resolveAliasPath(aliasPath: string): string {
  if (aliasPath.startsWith('@/')) {
    return path.join('src', aliasPath.slice(2));
  }
  return aliasPath;
}

async function componentExists(componentName: string, uiDir: string): Promise<boolean> {
  const tsxPath = path.join(process.cwd(), uiDir, `${componentName}.tsx`);
  const jsxPath = path.join(process.cwd(), uiDir, `${componentName}.jsx`);
  
  return fs.existsSync(tsxPath) || fs.existsSync(jsxPath);
}

async function getAllComponents(): Promise<string[]> {
  const packageRoot = path.join(__dirname, '..', '..');
  const componentsDir = path.join(packageRoot, 'src', 'components');
  
  const files = await fs.readdir(componentsDir);
  
  // Create a Set to store unique component names without extensions
  const uniqueComponents = new Set(
    files
      .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'))
      .map(file => file.replace(/\.(tsx|jsx)$/, ''))
  );
  
  return Array.from(uniqueComponents);
}

export async function listComponents() {
  const components = await getAllComponents();
  
  console.log(chalk.blue('\nAvailable components:'));
  components.forEach(component => {
    console.log(chalk.yellow(`  - ${component}`));
  });
  
  console.log(chalk.blue('\nTo add components, run:'));
  console.log(chalk.yellow('  npx tumble-ui add <component-name> [more-components...]'));
  console.log(chalk.blue('\nOr to add all components, run:'));
  console.log(chalk.yellow('  npx tumble-ui add all\n'));
}

async function installComponent(
  componentName: string, 
  uiDir: string, 
  componentsDir: string,
  extension: string
): Promise<void> {
  const packageRoot = path.join(__dirname, '..', '..');
  const componentPath = path.join(packageRoot, 'src', 'components', `${componentName}${extension}`);
  const dependenciesPath = path.join(packageRoot, 'src', 'dependencies', `${componentName}.json`);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component "${componentName}" not found in the package.`);
  }

  // Install dependencies if they exist
  if (fs.existsSync(dependenciesPath)) {
    const dependencies: Dependencies = await fs.readJson(dependenciesPath);
    
    if (dependencies.dependencies.length > 0) {
      console.log(chalk.blue(`Checking dependencies for ${componentName}...`));
      
      for (const dep of dependencies.dependencies) {
        const exists = await componentExists(dep, uiDir);
        
        if (!exists) {
          console.log(chalk.blue(`Installing dependency: ${dep}...`));
          execSync(`npx shadcn@latest add ${dep}`, {
            stdio: 'inherit',
            env: {
              ...process.env,
              npm_config_legacy_peer_deps: 'true'
            }
          });
        }
      }
    }
  }
  
  // Create sections directory inside the components directory
  const userSectionsDir = path.join(process.cwd(), componentsDir, 'sections');
  await fs.ensureDir(userSectionsDir);

  // Copy the component
  const userComponentPath = path.join(userSectionsDir, `${componentName}${extension}`);
  await fs.copy(componentPath, userComponentPath);

  console.log(chalk.green(`✓ Installed ${componentName}`));
}

export async function add(components: string[]) {
  try {
    // Ensure we're in a project with shadcn initialized
    if (!fs.existsSync('components.json')) {
      throw new Error('components.json not found. Please run `npx tumble-ui init` first to initialize shadcn.');
    }

    // Read components.json to get the correct paths
    const componentsConfig: ComponentsConfig = await fs.readJson('components.json');
    if (!componentsConfig.aliases?.components || !componentsConfig.aliases?.ui) {
      throw new Error('Could not find required paths in components.json');
    }

    // Get all available components
    const availableComponents = await getAllComponents();

    // Handle 'all' command
    if (components.length === 1 && components[0].toLowerCase() === 'all') {
      components = availableComponents;
    }

    // Validate all component names before starting installation
    const invalidComponents = components.filter(comp => !availableComponents.includes(comp));
    if (invalidComponents.length > 0) {
      throw new Error(`The following components were not found: ${invalidComponents.join(', ')}`);
    }

    // Resolve directories
    const uiDir = resolveAliasPath(componentsConfig.aliases.ui);
    const componentsDir = resolveAliasPath(componentsConfig.aliases.components);

    // Read components.json to get tsx configuration
    const componentConfig = await fs.readJson('components.json');
    const extension = componentConfig.tsx ? '.tsx' : '.jsx';

    console.log(chalk.blue(`Installing ${components.length} component(s)...`));

    // Install all components
    for (const component of components) {
      await installComponent(component, uiDir, componentsDir, extension);
    }

    console.log(chalk.green('\n✓ Successfully installed all components!'));
    console.log(chalk.blue(`Components installed in: ${path.join(componentsDir, 'sections')}`));
  } catch (error) {
    throw error;
  }
}