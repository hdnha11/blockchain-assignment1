import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';
import * as ticketActionsCreator from '../../actions/tickets';
import { getWeb3 } from '../../utils/web3';
import Ball from '../ball';
import styles from './ticket.css';

class Ticket extends Component {
  state = {
    accountAddress: '',
    amount: 0,
  };

  handleAddressChange = accountAddress => {
    this.setState({ accountAddress });
  };

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  render() {
    const {
      className, ticket, buying, undoPickNumber, addTicket,
    } = this.props;
    const { amount, accountAddress } = this.state;
    const web3 = getWeb3();

    return (
      <div
        className={classNames(
          styles.ticket,
          { [styles.error]: ticket.error },
          className,
        )}
      >
        <Ball className={styles.ball} number={ticket.number} />
        {!buying ? (
          <div className={styles.info}>
            <span className={styles.player}>Player: {ticket.player}</span>
            <span>{ticket.tx}</span>
          </div>
        ) : (
          <div className={styles.info}>
            <Select
              placeholder="Select Wallet..."
              onChange={this.handleAddressChange}
              value={accountAddress && accountAddress.value}
              options={web3.eth.accounts.map(account => ({
                value: account,
                label: account,
              }))}
            />

            <input
              className={styles.amount}
              type="number"
              value={amount}
              onChange={this.handleAmountChange}
            />

            <div className={styles.etherUnit}>
              {amount} finney = {web3.toWei(amount)} wei
            </div>

            <div className={styles.actions}>
              <button
                className={classNames(styles.button, styles.red)}
                onClick={undoPickNumber}
              >
                Cancel
              </button>
              <button
                className={styles.button}
                onClick={() =>
                  addTicket({
                    number: ticket.number,
                    amount,
                    player: accountAddress && accountAddress.value,
                  })
                }
              >
                Buy
              </button>
            </div>
            {ticket.error && (
              <div className={styles.errorMessage}>Opps!!! Please check your params!</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Ticket.propTypes = {
  className: PropTypes.string,
  buying: PropTypes.bool,
  ticket: PropTypes.object.isRequired,
  undoPickNumber: PropTypes.func.isRequired,
  addTicket: PropTypes.func.isRequired,
};

Ticket.defaultProps = {
  className: '',
  buying: false,
};

export default connect(null, ticketActionsCreator)(Ticket);
