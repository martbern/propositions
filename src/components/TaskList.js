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
        <div className="justify-center max-w-lg m-5 w-full">
            <ul>
                {activities.length > 0 ? (
                    activities
                    .map((record) => (
                        <Todo
                            name={record.fields.what_string}
                            key={record.id}
                            id={record.id}
                        />
                    ))
                ) : (
                    <p>Fetching Data...</p>
                )}
            </ul>
        </div>
    );
}
