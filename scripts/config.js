const path = require('path');

module.exports = {
  NODE_URL: 'http://localhost:7545',
  CONTRACT_DIR: path.resolve(__dirname, '../contracts'),
  BUILD_DIR: path.resolve(__dirname, '../build', 'contracts'),
  CONFIG_PATH: path.resolve(__dirname, '../config/config.json'),
  params: {
    VirtLotto: [
      150, // minimumBet
      4 // maxAmountOfBets
    ]
  }
};
