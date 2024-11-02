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
import path from 'path';

async function copyAssets() {
  const sourceDir = path.join(__dirname, '..');
  const distDir = path.join(sourceDir, 'dist');

  // Copy components
  await fs.copy(
    path.join(sourceDir, 'src', 'components'),
    path.join(distDir, 'components')
  );

  // Copy dependencies
  await fs.copy(
    path.join(sourceDir, 'src', 'dependencies'),
    path.join(distDir, 'dependencies')
  );

  // Copy assets
  await fs.copy(
    path.join(sourceDir, 'assets'),
    path.join(distDir, 'assets')
  );
}

copyAssets().catch(console.error);