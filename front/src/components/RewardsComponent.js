import React, {useEffect, useState} from 'react';
import {Footer} from "./parts/Footer";
import airdrop from '../assets/img/airdrop.png';
import wallet_open from '../assets/img/wallet_open.png';
import wallet_close from '../assets/img/wallet_close.png';

export function RewardsComponent(props) {
    const [names] = useState(props.name);
    async function setWallet() {
        const wallet = prompt("Enter your wallet address");
        const response = await fetch(props.main_url + '/api/add_wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'wallet': wallet
            }),
        })
    }
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
                    <img src={airdrop} className="airdrop" alt="airdrop"/>
                    <div className={"airdrop_text"}>
                        Airdrop soon...
                    </div>
                    <div>
                        <table>
                            {props.wallet === null || props.wallet.length === 0 ? (
                                <tr>
                                    <td className={'wallet'}><img src={wallet_close} alt="Add wallet" onClick={setWallet}/></td>
                                    <td className={"text_wallet"}>Add wallet</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className={'wallet'}><img src={wallet_open} alt="Wallet added" onClick={setWallet}/></td>
                                    <td className={"text_wallet"}>Wallet added</td>
                                </tr>
                            )}
                        </table>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
