import React, { useEffect, useState } from 'react';

function UserPurchases({ userId }) {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            fetch(`/api/users/${userId}/purchases`)
                .then(response => response.json())
                .then(data => {
                    setPurchases(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching purchases: {error.message}</div>;

    return (
        <div>
            <h2>Purchase History</h2>
            <ul>
                {purchases.map(purchase => (
                    <li key={purchase.id}>
                        {purchase.stockSymbol} - {purchase.shares} shares @ ${purchase.pricePerShare}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserPurchases;
