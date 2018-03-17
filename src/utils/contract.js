import { getWeb3 } from './web3';
import config from '../../config/config.json';

export const getContractInstance = () => {
  const web3 = getWeb3();
  const Contract = web3.eth.contract(config.contracts.VirtLotto.abi);

  return Contract.at(config.contracts.VirtLotto.address);
};
