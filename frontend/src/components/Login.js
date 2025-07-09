import React, { useState } from 'react';
import api from '../api';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('/auth/login', form);
        localStorage.setItem('token', res.data.token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="Password" type="password" onChange={handleChange} placeholder="Password" />
            <button type="Submit">Login</button>
        </form>
    );
}

export default Login;