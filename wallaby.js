module.exports = function(wallaby) {
  return {
    files: ['src/**/*.ts', 'src/tests/setup.js', 'package.json', '!src/**/*.spec.ts', '!src/**/*.spec.tsx'],

    tests: ['src/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['react-native'],
        plugins: ['transform-flow-strip-types', 'transform-object-rest-spread', 'transform-async-to-generator']
      })
    },

    setup: wallaby => {
      wallaby.testFramework.configure(require('./package.json').jest)
    }
  }
}
