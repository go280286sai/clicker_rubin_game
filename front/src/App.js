import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './components/MainComponent'
import {MainComponent} from "./components/MainComponent";
import {TasksComponent} from "./components/TasksComponent";
import {FriendsComponent} from "./components/FriendsComponent";
import {RewardsComponent} from "./components/RewardsComponent";
import {Routes, Route} from 'react-router-dom';
import {useEffect, useState} from "react";
import {config} from "./config.mjs";

const app_url = config.APP_URL.toString();

function App() {
    const [id, setId] = useState(0);
    const [names, setNames] = useState("User");
    const [friends, setFriends] = useState([]);
    const [wallet, setWallet] = useState("");
    useEffect(() => {
        // Функция для выполнения GET-запроса
        const fetchData = async () => {
            try {
                const response = await fetch('/user');
                const result = await response.json();
                setNames(result['name']);
                setId(result['id']);
                if (result['invite_ids'] === null) {
                    setFriends([]);
                } else {
                    setFriends(result['invite_ids']);
                }
                setWallet(result['wallet']);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/main" element={<MainComponent/>}/>
                <Route path="/tasks" element={<TasksComponent name={names}/>}/>
                <Route path="/friends"
                       element={<FriendsComponent name={names} friends={friends} app_url={app_url} id={id}/>}/>
                <Route path="/rewards" element={<RewardsComponent name={names} wallet={wallet}/>}/>
            </Routes>
        </div>
    );
}

export default App;
