module.exports = {
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },
  presets: ['@babel/env', '@babel/react'],
};
