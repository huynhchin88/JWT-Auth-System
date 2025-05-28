// Use for login & register
import { useState } from "react";
import axios from './api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/login', form);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}