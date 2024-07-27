import React, {useState} from 'react';
import {Footer} from "./parts/Footer";
import {Referral} from "./friends/referral";
import {Friends} from "./friends/friend_ref";

export function FriendsComponent(props) {
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
                    <Referral url={props.app_url} id={props.id}/>
                    <div className={'scrollable'}>
                        <Friends friends={props.friends} url={props.main_url}/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
