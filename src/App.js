// Module Start
// JS imports
import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import RecordView from './components/RecordView';
import RecordActions from './components/RecordActions';
import RecordStats from './components/RecordStats';

/**
 * App
 * @returns
 */
const App = () => {
  /**
   * State Management
   * - Single Source of Thruth for state to improve
   * performance by invoking useState once
   * - State shape:
   * {
   *  records: [ // Event records
   *    {
   *      order: 0, // Indicates the record order in the list
   *      data: {} // record information
   *    }
   *  ],
   *  alert: '', // End-user notifications
   *  stats: { // Records stats calculations
   *    visible: false, // Section visibility
   *    totalEvents: [ // Total Events
   *      {
   *        type: '', // Event name
   *        total: 0, // Frequency
   *      }
   *    ],
   *    totalEventsContext: { // BONUS - Total Events by context
   *      browser: 0, // Browser events
   *      dom: 0 // DOM nodes events
   *    },
   *    delays: { // Delay times between interactions
   *      min: null, // Minimum
   *      max: null, // Maximum
   *      mean: null // Average
   *    },
   *    longestSequence: 0, // Length of the longest input
   *    totalRecords: 0, // BONUS - Total interactions
   *    totalTime: null, // Total time of the interactions
   *  }
   * }
   */
  const [recordsManager, setRecordsManager] = useState({
    records: [],
    alert: '',
    stats: {
      visible: false,
      totalEvents: [],
      totalEventsContext: {
        browser: 0,
        dom: 0
      },
      delays: {
        min: null,
        max: null,
        mean: null
      },
      longestSequence: 0,
      totalRecords: 0,
      totalTime: null
    }
  });
  const {records, alert, stats} = recordsManager;
  // Data fetching handler
  const handleFetching = () => {
    fetch('/task.recording.json')
    .then((result) => result.json())
    .then((data) => setRecordsManager({
      ...recordsManager,
      records: data.records.map((record, i) => {
        return {
          order: i,
          data: record
        }
      })
    }));
  };
  /**
   * Record actions handler
   * @param {string} action User action
   * @param {number} order Record order number
   */
  const handleAction = (action, order) => {
    let newRecords = [];

    // Action check
    switch (action) {
      case 'up':
      case 'down':
        newRecords = setNewRecords(action, order, [...records]);

        newRecords.sort((a, b) => a.order - b.order)
        break;

      case 'delete':
        newRecords = [...records];

        const index = getRecordIndex(newRecords, order);

        newRecords.splice(index, 1);
        break;

      default:
    }

    setRecordsManager({
      ...recordsManager,
      records: newRecords
    });
  };
  /**
   * Records sorting setter
   * @param {string} action Selected record action
   * @param {number} order Selected record order
   * @param {array} newRecords Records
   * @returns
   */
  const setNewRecords = (action, order, newRecords) => {
    const record = newRecords.find((record) => record.order === order);

    // Existing record check
    if (record) {
      const index = getRecordIndex(newRecords, order);

      // If switching up and the previous one is not the fist
      if ((action === 'up') && (newRecords[index - 1].order >= 0)) {
        record.order -= 1;
        newRecords[index - 1].order += 1;
      // Else if switching down and the following one is not the last
      } if ((action === 'down') &&
      (newRecords[index + 1].order <= newRecords.length)) {
        record.order += 1;
        newRecords[index + 1].order -= 1;
      }
    }

    return newRecords;
  };
  /**
   * Record index getter
   * @param {array} newRecords Records
   * @param {number} order Record order
   * @returns
   */
  const getRecordIndex = (newRecords, order) => {
    return newRecords.findIndex((event) => event.order === order);
  };
  /**
   * Records save handler
   */
  const handleSave = useCallback(async () => {
    let message = '';

    try {
      const response = await fetch('/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: records.map((record) => {
            return {
              ...record.data
            }
          })
        })
      });
      const result = await response.text();

      message = result;
    } catch (error) {
      message = error;
    }

    setRecordsManager({
      ...recordsManager,
      alert: message
    });
    setTimeout(() => setRecordsManager({
      ...recordsManager,
      alert: ''
    }), 5000);
  }, [records]);
  /**
   * Records stats handler
   */
  const handleStats = () => {
    setRecordsManager({
      ...recordsManager,
      stats: {
        totalEvents: getTotalEvents(),
        // BONUS
        totalEventsContext: getTotalEventsByContext(),
        delays: getTimeDelays(),
        longestSequence: getLongestSequence(),
        // BONUS
        totalRecords: records.length,
        totalTime: getTimeFormat(getTotalTime().asMilliseconds(), 'hours'),
        visible: !stats.visible
      }
    });
  };
  /**
   * Total events by type getter
   * Get a list of all existing events and keep track of their frequency
   */
  const getTotalEvents = useCallback(() => {
    let events = [];

    /**
     * This loop could be improved in performance by
     * using a pagination system to reduce the data load.
     * See Readme for more details
     */
    records.forEach((record) => {
      // Existing tracked events check
      if (!events
      .some((event) => event.type === record.data.event.type)) {
        events.push({
          type: record.data.event.type,
          total: 0
        });
      }
    });
    events.forEach((event) => {
      event.total = records
      .filter((record) => record.data.event.type === event.type).length;
    });

    return events;
  }, [records]);
  /**
   * BONUS
   * Total events by context getter
   * Returns the number of interactions
   * related to the Browser/DOM nodes
   * @returns
   */
  const getTotalEventsByContext = () => {
    let countBrowser = 0;
    let countDom = 0;

    /**
     * This loop could be improved in performance by
     * using a pagination system to reduce the data load.
     * See Readme for more details
     */
    records.forEach((record) => {
      // Event type check
      if (!record.data.setup.nodeName) {
        countBrowser++;
      } else {
        countDom++;
      }
    });

    return {
      browser: countBrowser,
      dom: countDom
    };
  };
  /**
   * Event time delays getter
   * Returns the mimunim/maximum and average time
   * between each record
   */
  const getTimeDelays = useCallback(() => {
    // Initialize the delays by comparing the first two records
    let minDelay = getTimeDifference(
      records[1].data.time,
      records[0].data.time
    );
    let maxDelay = minDelay;
    let meanDelay = getTotalTime().asMilliseconds() / records.length;

    for (let i = 1; i < records.length - 1; i++) {
      const difference = getTimeDifference(
        records[i + 1].data.time,
        records[i].data.time
      );

      if (difference < minDelay) {
        minDelay = difference;
      } else if (difference > maxDelay) {
        maxDelay = difference;
      }
    }

    return {
      min: getTimeFormat(minDelay.asMilliseconds(), 'minutes'),
      max: getTimeFormat(maxDelay.asMilliseconds(), 'minutes'),
      mean: getTimeFormat(meanDelay, 'minutes')
    };
  }, [records]);
  /**
   * Events interaction time gap getter
   * @param {number} time Current event time
   * @param {number} timePrev Previous event time
   * @returns
   */
  const getTimeDifference = (time, timePrev) => {
    return moment.duration(moment(time).diff(moment(timePrev)));
  };
  /**
   * Longest input sequence length getter
   */
  const getLongestSequence = useCallback(() => {
    /**
     * Not sure about 'after filtering out focus events' meaning,
     * so getting only all the input events.
     * See Readme for performance improvement suggestions
     */
    return records.filter((record) => record.data.event.type === 'input')
    .reduce((accumulator, value) => accumulator >
    value.data.setup.value.length ?
      accumulator :
      value.data.setup.value.length
    );
  }, [records]);
  /**
   * Total events interaction getter
   */
  const getTotalTime = useCallback(() => {
    /**
     * Get the difference between each record timestamp
     * See Readme for performance improvement suggestions
     */
    return records
    .reduce((accumulator, value) =>
    moment.duration(moment(value.data.time).diff(moment(accumulator))));
  }, [records]);
  /**
   * Event time format getter
   * @param {number} time Event time
   * @param {string} format Time format
   * @returns
   */
  const getTimeFormat = (time, format) => {
    return moment.utc(time).format(format === 'hours' ?
      'hh:mm:ss' :
      'mm:ss'
    );
  };

  useEffect(() => {
    handleFetching();
  }, []);

  return (
    /* App Start */
    <div className="App">
      <h1>Avast Coding Challenge</h1>
      <RecordActions actions={{
        save: handleSave,
        stats: handleStats
      }}/>
      {alert !== '' &&
        <h2>{alert}</h2>
      }
      {stats.visible &&
        <RecordStats stats={stats} />
      }
      <RecordView records={records} action={handleAction} />
    </div>
    /* App End */
  );
}

// Module export
export default App;
// Module End
