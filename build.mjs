import { execSync } from 'node:child_process';
import { chmod } from 'node:fs/promises';
import { join } from 'node:path';

async function build() {
  try {
    console.log('🔨 Building library...');
    execSync('vite build', { stdio: 'inherit' });

    console.log('🔨 Building CLI...');
    execSync('vite build --config vite.cli.config.mts', { stdio: 'inherit' });

    console.log('📋 Copying static files...');
    execSync('npm run copy-static', { stdio: 'inherit' });

    console.log('🔑 Making CLI executable...');
    await chmod(join(process.cwd(), 'dist', 'cli.js'), 0o755);

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build(); 