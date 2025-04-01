import { execSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Define paths to built files
const paths = {
  cjs: join(process.cwd(), 'dist', 'codegen.js'),
  esm: join(process.cwd(), 'dist', 'codegen.mjs'),
  cli: join(process.cwd(), 'dist', 'cli.js'),
  dts: join(process.cwd(), 'dist', 'index.d.ts'),
  dcts: join(process.cwd(), 'dist', 'index.d.cts'),
};

// Check if all expected files exist
function validateFiles() {
  console.log('📋 Validating built files...');
  
  for (const [name, path] of Object.entries(paths)) {
    if (!existsSync(path)) {
      throw new Error(`Missing ${name} file: ${path}`);
    }
    console.log(`✅ ${name}: ${path} (${(statSync(path).size / 1024).toFixed(2)} KB)`);
  }
  
  // Check if CLI is executable
  try {
    const stats = statSync(paths.cli);
    const isExecutable = !!(stats.mode & 0o111);
    if (!isExecutable) {
      throw new Error(`CLI file is not executable: ${paths.cli}`);
    }
    console.log('✅ CLI file is executable');
  } catch (error) {
    console.error('❌ Error checking CLI executability:', error);
    throw error;
  }
}

// Test CLI functionality
function testCliHelp() {
  console.log('\n📋 Testing CLI help command...');
  try {
    const output = execSync(`node ${paths.cli} --help`, { encoding: 'utf8' });
    console.log('✅ CLI help command works:');
    console.log(`${output.slice(0, 200)}...`);
  } catch (error) {
    console.error('❌ CLI help command failed:', error);
    throw error;
  }
}

// Run the tests
try {
  validateFiles();
  testCliHelp();
  console.log('\n🎉 All tests passed! The build supports both library and CLI functionality.');
} catch (error) {
  console.error('\n❌ Tests failed:', error);
  process.exit(1);
} 