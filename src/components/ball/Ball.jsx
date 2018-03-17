import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ball.css';

const COLORS = {
  1: '#f44336',
  2: '#0097a7',
  3: '#9c27b0',
  4: '#3f51b5',
  5: '#009688',
  6: '#795548',
  7: '#43a047',
  8: '#e91e63',
  9: '#1e88e5',
  10: '#607d8b',
};

const Ball = ({
  className, number, selected, onClick,
}) => (
  <div
    className={classNames(
      styles.ball,
      {
        [styles.selected]: selected,
      },
      className,
    )}
    style={{ backgroundColor: COLORS[number] }}
    onClick={onClick}
  >
    {number}
  </div>
);

Ball.propTypes = {
  className: PropTypes.string,
  number: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

Ball.defaultProps = {
  className: '',
  selected: false,
  onClick: null,
};

export default Ball;
