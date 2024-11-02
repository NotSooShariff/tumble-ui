#!/usr/bin/env node

/**
 * Creator's Note -
 * 
 * We believe in making this project accessible and enjoyable for new contributors.
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

import { Command } from 'commander';
import { init } from './commands/init';
import { add, listComponents } from './commands/add';
import chalk from 'chalk';

const program = new Command();

program
  .name('tumble-ui')
  .description('CLI for managing Tumble UI components')
  .version('1.0.0');

// Initialize command: Sets up the project and verifies shadcn dependencies
program
  .command('init')
  .description('Initialize Tumble UI and check for shadcn setup')
  .action(async () => {
    try {
      await init();
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red('Failed to initialize:'), error.message);
      } else {
        console.error(chalk.red('Failed to initialize:'), 'An unknown error occurred');
      }
      process.exit(1);
    }
  });

// Add command: Manages component installation with interactive selection if no args provided
program
  .command('add [components...]')
  .description('Add one or more components to your project. Use "all" to add all components or run without arguments to see available components.')
  .action(async (components) => {
    try {
      if (!components || components.length === 0) {
        await listComponents();
      } else {
        await add(components);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red('Failed to add component(s):'), error.message);
      } else {
        console.error(chalk.red('Failed to add component(s):'), 'An unknown error occurred');
      }
      process.exit(1);
    }
  });

program.parse();