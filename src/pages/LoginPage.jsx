import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useAllUsers from '../hooks/useAllUsers';

export default function LoginPage() {

  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const [error, setError] = useState('');
  

  const {handleLogin} = useAuth();
  const navigate = useNavigate();
  const {allUsers} = useAllUsers();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password.trim().length < 6){
      setError('smaller then 6 characters')
      return;
    }

    if(!email.trim().includes('@')){
      setError('not email includes')
      return;
    }

    const result = handleLogin(email, password, allUsers);

    if(!result.success){
      setError(result.message);
      return;
    }

    navigate('/dashboard/myprofile');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div><br/>
          <label>Email:</label><br/>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label><br/>
          <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
