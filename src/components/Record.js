import React , {Component} from "react";
import Airtable from 'airtable-node'

const Log = new Airtable({apiKey: 'keywMvCl7aRV4a5af'})
    .base('appMcSmdPtPWcBhIX')
    .table('Log')

class Record extends Component {
    constructor(props) {
        super(props);
    }
    
    delete = () => {
        var element = document.getElementById(this.props.id);
        element.style.opacity = "0.1";

        Log.delete(this.props.id).then(resp => {
            console.log("Deleting" + this.props.id)
            console.log(resp)
            
            element.style.borderColor = "red";
            element.style.borderWidth = "4px";
        })
    }

    markComplete = () => {
        var element = document.getElementById(this.props.id);
        element.classList.add("border-green-700")
        
        Log.update(this.props.id, {"Concluded": true}).then(resp => {
            console.log(resp)
            console.log("Concluded? " + this.props.concluded)
            
            element.classList.remove("border")
            element.classList.add("border-4")
            element.classList.add("opacity-50")
        })
    }

    /* let atHref = "https://airtable.com/tblo6SQZQakNq4URH/viwd4XwZ1wC8esYgg" + this.props.id; */

    openInAt = () => {
        console.log("Opening in Airtable")
        window.open("https://airtable.com/tblJy7BTWYrsbf5M5/viwlybKN4v201IY8V/" + this.props.id)
    }
    
    render() {
        return (
        <div>
            <a href = {this.href} className={this.props.concluded === 1 ? "border-4 border-green-700 shadow-sm active:border-gray-500 group block rounded-lg p-2 sm:p-4 hover:border-gray-300 m-0 sm:m-0 text-left opacity-50" : "shadow-sm active:border-gray-500 group block rounded-lg p-2 sm:p-4 hover:border-gray-300 m-0 sm:m-0 text-left border"} id={this.props.id}>
                
                <div className="pb-0">
                    <div className="font-medium text-black text-xl sm:text-2xl">{this.props.name}</div>
                    {typeof this.props.notes !== "undefined" ? (<div className="text-xs sm:text-sm text-gray-500 m-t-3">{this.props.notes}</div>) : ""}
                </div>

                <div className="space-y-0 hidden sm:block">
                    {'goals' in this.props && typeof this.props.goals !== "undefined" ? (
                            this.props.goals
                                .split(",")
                                .map((goal) => (
                                    <div className="inline-block rounded py-1 px-1 bg-gray-300 text-white mr-1 text-xs">{goal}</div>
                                ))
                            ) : (
                                ""
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 space-x-1 mt-1 space-y-0 sm:space-y-0">
                    <button onClick={() => this.markComplete()}
                            className= "rounded-lg px-3 py-2 border active:border-gray-500 text-center focus:outline-none text-xs text-gray-400 hover:bg-gray-50"
                        >
                            Mark
                    </button>

                    <button onClick={() => this.delete()}
                            className= "rounded-lg px-3 py-2 border active:border-gray-500 text-center focus:outline-none text-xs text-gray-400 hover:bg-gray-50"
                        >
                            Delete
                    </button>

                    <button onClick={() => this.openInAt()}
                            className= "rounded-lg px-3 py-2 border active:border-gray-500 text-center focus:outline-none text-xs text-gray-400 hover:bg-gray-50 hidden sm:block" 
                        >
                            Airtable
                    </button>
                </div>
            </a>
                
        </div>
        );
    }
}

export default Record