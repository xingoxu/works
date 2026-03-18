const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const targetDir = path.join(distDir, 'buy-calc');
const repoUrl = process.env.BUY_CALC_REPO_URL || 'https://github.com/xingoxu/buy-calc.git';
const branch = process.env.BUY_CALC_BRANCH || 'master';

async function syncBuyCalc() {
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  await execFileAsync('git', [
    'clone',
    '--depth',
    '1',
    '--branch',
    branch,
    repoUrl,
    targetDir,
  ], {
    cwd: rootDir,
  });

  // await fs.rm(path.join(targetDir, '.git'), { recursive: true, force: true });
}

syncBuyCalc().catch((error) => {
  console.error('Failed to sync buy-calc into dist:', error);
  process.exitCode = 1;
});
