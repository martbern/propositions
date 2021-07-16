import React, { useState, useEffect } from 'react'
import TaskListMorning from './components/TaskListMorning'
import TaskListAfternoon from './components/TaskListAfternoon'
import TaskListEvening from './components/TaskListEvening'
import TaskListNone from './components/TaskListNone';
import Airtable from 'airtable-node';

const airtable = new Airtable({apiKey: 'keywMvCl7aRV4a5af'})
    .base('appMcSmdPtPWcBhIX')
    .table('Log')

function App(props) {
  const [run, reRun] = useState({});
  console.log(run)

  const [activities, setActivities] = useState({});

  useEffect(() => {
      airtable.list({
          maxRecords: 999,
          pageSize: 30,
          view: "L: Today's propositions",
          cellFormat: 'json'
      })
      .then((data) => {
          setActivities(data.records);
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);

  console.log(activities)

  return (
    <div className="grid mx-auto max-w-5xl">
        {/* <ul className="grid grid-cols-2">
          {goals.length > 0 ? (
              goals
              .filter(record => record.fields.Name.length < 100)
              .slice(0, 6)
              .map((record) => (
                  <FilterButton
                      name={record.fields.Name}
                      setFilter={setFilter}
                  />
              ))
          ) : (
              <p>Fetching Data...</p>
          )}
          </ul> */}
      <div className="grid m-2">
        <TaskListNone 
          reRun={reRun}
          activities={activities}
          airtable={airtable}
        />
        <TaskListMorning 
          reRun={reRun}
          activities={activities}
          airtable={airtable}
        />
        <TaskListAfternoon
          reRun={reRun}
          activities={activities}
          airtable={airtable}
        />
        <TaskListEvening
          reRun={reRun}
          activities={activities}
          airtable={airtable}
        />
      </div>
    </div>
  );
}

export default App;
