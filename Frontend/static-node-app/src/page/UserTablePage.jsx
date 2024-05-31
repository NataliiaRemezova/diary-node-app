import { useState, useEffect } from 'react';

function UserTable (){

    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [num, setNum] = useState(1);

    // curently hardcoded, for now automatically creates 3 users, later only possible through login
    /*
    useEffect(() => {
        fetch('http://localhost:5000/api/user/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: "Cindy Cinnamon", email: "tolleemail@supi.com" })
        })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data])
                setCurrentUser(data);
            })
            .catch(error => console.error('Error creating user:', error));
    }, []);
    */

    useEffect(() => {
        fetch('http://localhost:5000/api/user/get-users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    
    const addUser = async () => {
        setNum(num+1);

        fetch('http://localhost:5000/api/user/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: "User"+num, email: "email"+num })
        })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data])
                setCurrentUser(data)
                console.log(data);
            })
            .catch(error => console.error('Error creating user:', error));
    };


    return(
            <div>
                <button style={{backgroundColor: "blue"}} onClick={addUser}>Add User</button>

                <table class="styled-table">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>

                    {users.map((users, index) => (
                        <tr key={index}>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                        </tr>
                    ))}
                    
                </table>
            </div>
    );
}

export default UserTable