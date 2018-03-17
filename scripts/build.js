const solc = require('solc');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');

const {CONTRACT_DIR, BUILD_DIR} = require('./config.js');

const mkdir = dirPath =>
  dirPath.split(path.sep).reduce((currentPath, folder) => {
    currentPath += folder + path.sep;
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return currentPath;
  }, '');

const compile = filename => {
  const filePath = path.resolve(CONTRACT_DIR, filename);
  const [contractName] = filename.split('.');

  const code = fs.readFileSync(filePath).toString();
  const compiledCode = solc.compile(code);

  if (compiledCode.errors && compiledCode.errors.length) {
    console.error(chalk.bold.red('FAIL!'), compiledCode.errors);
  } else {
    const compiledPath = path.resolve(BUILD_DIR, `${contractName}.json`);
    fs.writeFileSync(
      compiledPath,
      JSON.stringify(compiledCode)
    );
    console.log(chalk.green('Generated'), chalk.cyan(compiledPath));
  }
};

const build = () => {
  mkdir(BUILD_DIR);
  fs.readdirSync(CONTRACT_DIR).forEach(filename => compile(filename));
};

if (fs.existsSync(BUILD_DIR)) {
  rimraf(BUILD_DIR, build);
} else {
  build();
}
