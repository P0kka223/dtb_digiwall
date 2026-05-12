// components/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../state/store';

const Dashboard: React.FC = () => {
    // Grab the user data to personalize the dashboard
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <section>
            <h1>Welcome to your Dashboard, {user?.username}!</h1>
            <p>You have successfully logged in.</p>
            <div>
                <h3>User Details:</h3>
                <ul>
                    <li>Email: {user?.email}</li>
                    <li>User ID: {user?.id}</li>
                </ul>
            </div>
        </section>
    );
};

export default Dashboard;