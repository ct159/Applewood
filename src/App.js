// src/App.js
import React from 'react';
import { AuthProvider } from './components/AuthContext';
import Signup from './components/Signup';

function App() {
    return (
        <AuthProvider>
            <Signup />
            {/* Other components */}
        </AuthProvider>
    );
}

export default App;
