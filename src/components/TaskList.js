import React, { useState, useEffect } from 'react'
import Todo from "./Record";
import Airtable from 'airtable-node'

const airtable = new Airtable({apiKey: 'keywMvCl7aRV4a5af'})
    .base('appMcSmdPtPWcBhIX')
    .table('Log')

export default function TaskList(props) {

    const [activities, setActivities] = useState({});

    useEffect(() => {
        airtable.list({
            maxRecords: 999,
            pageSize: 100,
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

    console.log("Testing " + props.cycle)

    return (
        <div className="justify-center max-w-full w-full grid grid-cols-2 grid-flow-row-dense">
                {activities.length > 0 ? (
                    activities
                    /* .filter(record => record.fields["Concluded formula"] === 0) */
                    .sort(function (a, b) {
                        return a.fields["Concluded formula"] - b.fields["Concluded formula"];
                    })
                    .map((record) => (
                        <Todo
                            name={record.fields.what_string}
                            key={record.id}
                            id={record.id}
                            notes={record.fields["Learning points"]}
                            goals={record.fields["goals_string"]}
                            concluded={record.fields["Concluded formula"]}
                        />
                    ))
                ) : (
                    <p>Fetching propositions if any uncompleted...</p>
                )}
        </div>
    );
}
