import React from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'semantic-ui-react'

const Stats = (props) => (
    <Statistic.Group size='mini'>
      <Statistic>
        <Statistic.Value>{props.total}</Statistic.Value>
        <Statistic.Label>Total</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>{props.today}</Statistic.Value>
        <Statistic.Label>Today</Statistic.Label>
      </Statistic>
    </Statistic.Group>
);

Stats.propTypes = {
  total: PropTypes.number,
  today: PropTypes.number
};

export default Stats;