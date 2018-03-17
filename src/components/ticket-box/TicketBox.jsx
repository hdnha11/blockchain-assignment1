import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ticket from '../ticket';
import styles from './ticket-box.css';

const TicketBox = ({ tickets }) => (
  <div className={styles.ticketBox}>
    {tickets.length ? (
      <p className={styles.title}>Your tickets</p>
    ) : (
      <p className={styles.title}>Pick your number!</p>
    )}
    {tickets.map(ticket => (
      <Ticket className={styles.ticket} key={ticket.tx} ticket={ticket} />
    ))}
  </div>
);

TicketBox.propTypes = {
  tickets: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  tickets: state.tickets.all,
});

export default connect(mapStateToProps)(TicketBox);
