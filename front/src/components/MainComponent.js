import React, {useEffect, useState} from 'react';
import tapImage from '../assets/img/tap.png';
import {Footer} from './parts/Footer.js';

export function MainComponent(props) {
    const [id, setId] = useState(0);
    const [names, setNames] = useState("");
    const [count, setCount] = useState(0);
    const [clicks, setClicks] = useState([]);
    const [key, setKey] = useState(0);
    const [main_url] = useState(props.main_url);

    const handleClick = async (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setClicks((prevClicks) => [...prevClicks, {x, y, key, count: count + 1}]);
        setCount(count + 1);
        setKey((prevKey) => prevKey + 1);

        await mint();

        setTimeout(() => {
            setClicks((prevClicks) => prevClicks.filter((click) => click.key !== key));
        }, 1000); // Длительность анимации должна совпадать с CSS
    };

    useEffect(() => {
        // Функция для выполнения GET-запроса
        const fetchData = async () => {
            try {
                const response = await fetch(main_url + '/user');
                const result = await response.json();
                setCount(parseInt(result['amount']));
                setNames(result['name']);
                setId(result['id']);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [main_url]);

    async function mint(main_url = props.main_url) {
        await fetch('/api/mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id': id, 'amount': count + 1}),
        })
    }

    return (
        <div className="container fon">
            <header>
                <div className="header_tap">
                    <h3 className="header_txt">{names && names.length>0?
                        (<strong className={"rubin_tab_name"}>{names}</strong>):( <strong>Rubin Tap</strong>)}
                    </h3>
                </div>
            </header>
            <main>
                <div className="score_block">
                    <div className="score">{count}</div>
                </div>
                <div className="ruby-image">
                    <img src={tapImage} alt="Ruby" onClick={handleClick}/>
                    {clicks.map((click) => (
                        <div
                            key={click.key} className="number" style={{left: click.x, top: click.y}}>
                            +1
                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    );
}
