import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
}

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await client.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            console.error(err);
            if ((err as any).response?.status === 401 || (err as any).response?.status === 403) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [navigate]);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle) return;
        try {
            await client.post('/tasks', { title: newTaskTitle });
            setNewTaskTitle('');
            fetchTasks();
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await client.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Task Dashboard</h1>
                    <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
                </div>

                <form onSubmit={handleCreateTask} className="mb-8 flex gap-4">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="New Task Title"
                        className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded"
                    />
                    <button type="submit" className="bg-blue-600 px-6 py-2 rounded">Add Task</button>
                </form>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="grid gap-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{task.title}</h3>
                                <p className="text-gray-400 text-sm">{task.status}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-400 hover:text-red-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {tasks.length === 0 && <p className="text-gray-500 text-center">No tasks found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
