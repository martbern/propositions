import React from "react";

export default function Todo(props) {
    let HrefLink = "https://airtable.com/tblQ8knSKksdnr3XP/viwpBQskkpNTJx4Wv/" + props.id

    return (<div>
                <a href={HrefLink} className="shadow-md hover:shadow-lg group block rounded-lg p-4 border hover:border-gray-200 m-2 text-center justify-center">
                    <div className="h-32 p-3 grid place-items-center">
                        <div className="leading-6 font-medium text-black text-c text-xl">{props.name}</div>
                    </div>
                </a>
            </div>
    );
}
