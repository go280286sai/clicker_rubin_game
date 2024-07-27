import React, {useState} from 'react';

export function Referral(props) {
    let [text, setText] = useState('');
    function copyText() {
        const textToCopy = `${props.url}?start=${props.id}`;
        navigator.clipboard.writeText(textToCopy).then(()=>{
            setText('Copied!');
            setTimeout(() => {
                setText('')
            }, 2000)
        })
    }

    return (
        <div className="referal_block">
            <div className="referral_block_status">{text}</div>
            <div className="referral_block_txt" onClick={copyText} title={"Click to send"}>Referral link</div>
        </div>
    )
}