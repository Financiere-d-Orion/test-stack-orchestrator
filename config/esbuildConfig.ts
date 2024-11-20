export const esbuildConfig = {
  packager: 'yarn',
  bundle: true,
  minify: false,
  sourcemap: true,
  exclude: [],
  target: 'node18',
  platform: 'node',
  mainFields: ['module', 'main'],
};
