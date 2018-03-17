import * as types from './types';
import { getWeb3 } from '../utils/web3';
import { getContractInstance } from '../utils/contract';

export const pickNumber = number => ({
  type: types.PICK_NUMBER,
  number,
});

export const undoPickNumber = () => ({
  type: types.UNDO_PICK_NUMBER,
});

export const addTicket = ({ number, amount, player }) => dispatch => {
  const web3 = getWeb3();
  const contract = getContractInstance();

  try {
    contract.pickNumber(
      number,
      {
        from: player,
        value: web3.toWei(amount, 'finney'),
        gas: 1000000,
      },
      (error, result) => {
        if (error) {
          dispatch({
            type: types.ADD_TICKET_FAIL,
            error: JSON.stringify(error),
          });
        } else {
          dispatch({
            type: types.ADD_TICKET,
            ticket: {
              tx: result,
              number,
              player,
            },
          });
        }
      },
    );
  } catch (error) {
    dispatch({
      type: types.ADD_TICKET_FAIL,
      error: JSON.stringify(error),
    });
  }
};
