import React, { useState, useEffect } from 'react'
import Record from "./Record";
import Airtable from 'airtable-node'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

today = dd + '/' + mm;

const airtable = new Airtable({apiKey: 'keywMvCl7aRV4a5af'})
    .base('appMcSmdPtPWcBhIX')
    .table('Log')

export default function TaskListAfternoon(props) {

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
        <div>
            <h1 className="text-3xl font-bold">Afternoon</h1>
            <div className="justify-center max-w-full w-full grid grid-cols-2 grid-flow-row-dense gap-1">
                
                    {activities.length > 0 ? (
                        activities
                        /* .filter(record => record.fields["Concluded formula"] === 0) */
                        .sort(function (a, b) {
                            return a.fields["Concluded formula"] - b.fields["Concluded formula"];
                        })
                        .filter(record => record.fields["exec-date"] === today)
                        .filter(record => record.fields["time-of-day"].includes("Afternoon") === true)
                        .map((record) => (
                            <Record
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
        </div>
    );
}
