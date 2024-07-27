import React, { useEffect, useState } from "react";

export function Tasks(props) {
    async function mint(count, n) {
        await fetch(props.main_url+'/api/mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'amount': count + n }),
        });
    }

    async function insertUsersTasks(user_id, task_id) {
        await fetch(props.main_url+'/api/insert_users_tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'user_id': user_id, 'task_id': task_id }),
        });
    }

    function DataFetchingComponent() {
        const [data, setData] = useState(null);
        const [count, setCount] = useState(0);
        const [tasks_ids, setTasks_ids] = useState([]);
        const [user_id, setUser_id] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    let response = await fetch(props.main_url+'/tasks');
                    let result = await response.json();
                    setData(result);

                    response = await fetch(props.main_url+'/user');
                    result = await response.json();
                    setCount(parseInt(result['amount']));
                    setTasks_ids(result['tasks_ids'] || []); // Ensure tasks_ids is an array
                    setUser_id(result['user_id']);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }, []);

        return (
            <div className={"ol_style"}>
                <p>Список задач</p>
                <table className={"table table-dark"}>
                    <tbody>
                    {data && data.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.amount}</td>
                            <td>
                                {tasks_ids && tasks_ids.includes(task.id) ? (
                                    <div className={"btn btn-danger btn_start disabled"}>Run</div>
                                ) : (
                                    <div
                                        className={"btn btn-danger btn_start"}
                                        onClick={() => {
                                            window.open(task.url, '_blank');
                                            setTimeout(async () => {
                                                await mint(count, task.amount);
                                                await insertUsersTasks(user_id, task.id);
                                                window.location.reload();
                                            }, 1000);
                                        }}
                                    >
                                        Run
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <DataFetchingComponent />
        </div>
    );
}
