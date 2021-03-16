// Module Start
// JS import
import React from 'react';
import PropTypes from 'prop-types';

// Records user actions
const RecordActions = (props) => {
  const {actions} = props;

  return (
    /* Actions Start */
    <aside>
      <button onClick={actions.save}>SAVE</button> | <button onClick={actions.stats}>STATS</button>
    </aside>
    /* Actions End */
  );
};

// Properties Validation
RecordActions.propTypes = {
  actions: PropTypes.object.isRequired
};

// Module export
export default RecordActions;
// Module End
