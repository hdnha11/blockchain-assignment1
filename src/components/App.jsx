import React from 'react';
import BallPicker from './ball-picker';
import TicketBox from './ticket-box';
import styles from './app.css';

const App = () => (
  <div>
    <h1 className={styles.appTitle}>Virtual Powerball</h1>
    <BallPicker />
    <TicketBox />
  </div>
);

export default App;
