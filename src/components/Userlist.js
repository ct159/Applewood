import React, { useEffect, useState } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.firstName} {user.lastName}</li>
            ))}
        </ul>
    );
}

export default UserList;
