import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ball from '../ball';
import Ticket from '../ticket';
import * as ticketActionsCreator from '../../actions/tickets';
import styles from './ball-picker.css';

function* range(from, to) {
  let i = from;

  while (i <= to) {
    yield i;
    i += 1;
  }
}

const BallPicker = ({ buyingTicket, pickNumber }) => (
  <div className={styles.ballPicker}>
    {[...range(1, 10)].map(number => (
      <Ball
        className={styles.ball}
        key={number}
        number={number}
        onClick={() => pickNumber(number)}
      />
    ))}
    {buyingTicket && (
      <Ticket className={styles.buyingTicket} ticket={buyingTicket} buying />
    )}
  </div>
);

BallPicker.propTypes = {
  buyingTicket: PropTypes.object,
  pickNumber: PropTypes.func.isRequired,
};

BallPicker.defaultProps = {
  buyingTicket: null,
};

const mapStateToProps = state => ({
  buyingTicket: state.tickets.buyingTicket,
});

export default connect(mapStateToProps, ticketActionsCreator)(BallPicker);
