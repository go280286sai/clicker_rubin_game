import {Footer} from "./parts/Footer";
import {Tasks} from "./tasks/Tasks";
import React, {useState} from "react";

export function TasksComponent(props) {
const [names] = useState(props.name);

    return (
        <div className="container fon-2">
            <header>
                <div className="header_tap">
                    <h3 className="header_txt">{names && names.length > 0 ?
                        (<strong className={"rubin_tab_name"}>{names}</strong>) : (<strong>Rubin Tap</strong>)}
                    </h3></div>
            </header>
            <main>
                <div className="body_text">
                    <div className={'scrollable tasks'}>
                        <Tasks main_url={props.main_url}/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

