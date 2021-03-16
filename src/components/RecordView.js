// Module Start
// JS imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Records View
const RecordView = (props) => {
  const {records, action} = props;

  return (
    /* Table Start */
    <table>
      {/* Body Start */}
      <tbody>
        {records.map((record, i) => (
          // Record Start
          <tr key={`record-${i}`}>
            <td>{record.data.event.type}</td>
            <td>
              {record.data.setup.nodeName ?
                record.data.setup.nodeName :
                '-'
              }
            </td>
            <td>
              {moment(record.data.time).format('MM/DD/YYYY - HH:mm:ss')}
            </td>
            <td>
              {i > 0 &&
                <button onClick={() => action('up', record.order)}>🔼</button>
              }
              {i < records.length - 1 &&
                <button onClick={() => action('down', record.order)}>🔽</button>
              }
              <button onClick={() => action('delete', record.order)}>🗑️</button>
            </td>
          </tr>
          // Record End
        ))}
      </tbody>
    </table>
  );
};

// Properties Validation
RecordView.propTypes = {
  records: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired
};

// Module export
export default RecordView;
// Module End
