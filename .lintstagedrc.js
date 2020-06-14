module.exports = {
  '*.js': ['eslint --fix', 'prettier --write'],
  '*.{css,html,json,md}': ['prettier --write'],
  'src/*.js': ['jest --find-related-tests'],
};
