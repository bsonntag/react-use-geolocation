module.exports = {
  '*.js': ['eslint --fix', 'git add'],
  'src/*.js': 'jest --findRelatedTests',
};
