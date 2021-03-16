// Module Start
// JS imports
import React from 'react';
import PropTypes from 'prop-types';

// Records Stats
const RecordStats = (props) => {
  const {
    totalEvents,
    totalEventsContext,
    delays,
    longestSequence,
    totalRecords,
    totalTime
  } = props.stats;

  return (
    /* Stats Start */
    <section>
      <h2>Global Record Stats</h2>
      {/* Total Events Start */}
      <h3>Total events by type</h3>
      <ul>
        {totalEvents.map((totalEvent, i) => (
          <li key={`event-${i}`}>
            {totalEvent.type}: {totalEvent.total}
          </li>
        ))}
      </ul>
      {/* Total Events End */}
      {/* BONUS - Total Events Context Start */}
      <h3>Total events by context</h3>
      <ul>
        <li>Browser: {totalEventsContext.browser}</li>
        <li>DOM: {totalEventsContext.dom}</li>
      </ul>
      {/* Total Events Context End */}
      {/* Interaction Delays Start */}
      <h3>Event interactions delays</h3>
      <ul>
        <li>Min: {delays.min}s</li>
        <li>Max: {delays.max}s</li>
        <li>Mean: {delays.mean}s</li>
      </ul>
      {/* Interaction Delays End */}
      {/* Longest Input Sequence */}
      <h3>Longest input sequence length: {longestSequence}</h3>
      {/* BONUS - Total Interactions */}
      <h3>Total interactions : {totalRecords}</h3>
      {/* Total Time */}
      <h3>Total interaction time: {totalTime}</h3>
    </section>
    /* Stats End */
  );
};

// Properties Validation
RecordStats.propTypes = {
  stats: PropTypes.object.isRequired
};

// Module export
export default RecordStats;
// Module End
