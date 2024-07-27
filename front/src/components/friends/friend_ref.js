import React, {useEffect, useState} from 'react';
export function Friends(props) {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
              let data =  await fetch(props.url+'/api/insert_invite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'invite_ids': props.friends}),
                });

                const result = await data.json();
                if(result.length === 0){
                    setFriends([]);
                }
                setFriends(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [props.friends]);
    return (
        <div>
           <table>
               <tbody>
               {friends && friends.map((friend) => (
                       <tr key={friend.name}>
                           <td>{friend.name}</td>
                           <td>{friend.amount}</td>
                       </tr>
               ))}
               </tbody>
           </table>
        </div>
    );
}