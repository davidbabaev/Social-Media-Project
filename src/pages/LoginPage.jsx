import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


export default function LoginPage() {

  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const [error, setError] = useState('');

  const {handleLogin} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.trim().length < 6){
      setError('smaller then 6 characters')
      return;
    }

    if(!email.trim().includes('@')){
      setError('not email includes')
      return;
    }

    const result = await handleLogin(email, password);

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
         <br />
        <button type='submit'>Login</button>
        
      </form>
      <br />
      <hr />
      <br />
      <Button 
        variant="outlined" 
        startIcon={<GoogleIcon/>}
        sx={{margin:'10px'}} 
        href='http://localhost:8181/auth/google'  
      >
        Login With Google
      </Button>
    </div>
  )
}
