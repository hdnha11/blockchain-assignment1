const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const {
  NODE_URL,
  CONTRACT_DIR,
  BUILD_DIR,
  CONFIG_PATH,
  params
} = require('./config.js');

const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL));

const updateConfig = ({contractName, address, abi}) => {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH).toString());

  config.contracts[contractName] = config.contracts[contractName] || {};
  config.contracts[contractName].address = address;
  config.contracts[contractName].abi = abi;

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
};

const deploy = filename => {
  const filePath = path.resolve(BUILD_DIR, filename);
  const [contractName] = filename.split('.');

  const compiledCode = JSON.parse(fs.readFileSync(filePath).toString());

  const Contract = web3.eth.contract(
    JSON.parse(compiledCode.contracts[`:${contractName}`].interface)
  );

  const byteCode = compiledCode.contracts[`:${contractName}`].bytecode;

  const contractData = Contract.new.getData(...params[contractName], {
    data: byteCode
  });

  const estimatedGas = web3.eth.estimateGas({data: contractData});

  Contract.new(
    ...params[contractName],
    {
      data: byteCode,
      from: web3.eth.accounts[0],
      gas: estimatedGas
    },
    (error, contract) => {
      if (error) {
        console.error(chalk.red(error));
        return;
      } else if (contract.address) {
        updateConfig({
          contractName,
          address: contract.address,
          abi: contract.abi
        });
        console.log(
          `${chalk.bold.cyan(contractName)} ${chalk.green(
            'contract deployed at:'
          )}`,
          chalk.bold.cyan(contract.address)
        );
      }
    }
  );
};

const filenames = fs.readdirSync(BUILD_DIR);

if (!filenames.length) {
  console.log(chalk.yellow(`There is nothing to deploy in ${BUILD_DIR}`));
} else {
  filenames.forEach(filename => deploy(filename));
}
