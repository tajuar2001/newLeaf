import React, { useState } from 'react';
import './css/login_reg_style.css';

function RegisterForm({ onRegister, onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            if (profilePicture) {
                formData.append('profile_picture', profilePicture);
            }

            const response = await fetch('/register', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to register');
            onRegister(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="log-reg-form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit">Register</button>
                    <button type="button" onClick={onBack}>Back</button>
                </div>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default RegisterForm;