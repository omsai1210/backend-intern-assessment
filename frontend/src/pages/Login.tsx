import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await client.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const handleRegister = async () => {
        try {
            await client.post('/auth/register', { email, password });
            // Auto login after register or ask to login. For now, try login.
            const response = await client.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login / Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                        required
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded">
                            Login
                        </button>
                        <button type="button" onClick={handleRegister} className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
