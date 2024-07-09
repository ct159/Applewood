import React, { useState } from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import UserPurchases from './UserPurchases';

function Users() {
    const { users, loading, error } = useFetchUsers();
    const [stockSymbol, setStockSymbol] = useState('');
    const [shares, setShares] = useState(0);
    const [pricePerShare, setPricePerShare] = useState(0);
    const [userId, setUserId] = useState(null);

    const handlePurchase = async () => {
        const purchaseData = { stockSymbol, shares, pricePerShare, userId };
        try {
            const response = await fetch('/api/purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });
            if (response.ok) {
                console.log('Purchase recorded');
            } else {
                console.error('Failed to record purchase');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users: {error.message}</div>;

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>

            <h2>Make a Purchase</h2>
            <div>
                <input type="text" placeholder="Stock Symbol" value={stockSymbol} onChange={e => setStockSymbol(e.target.value)} />
                <input type="number" placeholder="Shares" value={shares} onChange={e => setShares(parseInt(e.target.value))} />
                <input type="number" placeholder="Price per Share" value={pricePerShare} onChange={e => setPricePerShare(parseFloat(e.target.value))} />
                <select value={userId} onChange={e => setUserId(e.target.value)}>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                </select>
                <button onClick={handlePurchase}>Buy</button>
            </div>

            {userId && <UserPurchases userId={userId} />}
        </div>
    );
}

export default Users;
