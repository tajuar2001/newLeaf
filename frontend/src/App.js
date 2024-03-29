import './App.css';
import LoginForm from './components/loginForm';
import React, { useState, useEffect } from 'react';
import RegisterForm from './components/registerForm';
import LandingPage from './components/landingPage';
import UserProfile from './components/userProfile';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'landing');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('user', JSON.stringify(user));
  }, [currentPage, user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('landing');
    setError('');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    setError('');
  };

  const handleRegister = () => {
    setCurrentPage('login');
    setError('');
  };

  const navigate = (page) => {
    setCurrentPage(page);
    setError('');
  };

  const handleNavigateToAdvicePosts = () => setCurrentPage('advicePosts');
  const handleNavigateToCreateAdvicePost = () => setCurrentPage('createAdvicePost');

  return (
    <div className="App">
      <header className="App-header">
        <div className="yellow-bar"></div>
        {error && <p className="error-message">{error}</p>}
        {user && (
          <UserProfile
            user={user}
            onLogout={handleLogout}
          />
        )}
        {!user && currentPage === 'landing' && <LandingPage onNavigate={navigate} />}
        {!user && currentPage === 'login' && (
          <LoginForm onLogin={handleLogin} onBack={() => navigate('landing')} />
        )}
        {!user && currentPage === 'register' && (
          <RegisterForm onRegister={handleRegister} onBack={() => navigate('landing')} />
        )}
      </header>
    </div>
  );
}

export default App;