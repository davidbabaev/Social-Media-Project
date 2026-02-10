import React, { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom';
import useCountries from '../hooks/useCountries';

export default function RegisteredPage() {
    
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    const {handleRegister} = useAuth();
    const {apiCountriesList, apiCountriesListLoading} = useCountries();

    // navigation
    const navigate = useNavigate();

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        
        if(name.trim() === ''){
            setError('Name is required');
            return;
        }
        
        if(password.trim().length < 6){
            setError('Password must be at least 6 characters');
            return;
        }
        
        if(!email.trim().includes('@')){
            setError('email must includes @');
            return;
        }

        if(country === ''){
            setError('Country is Required');
            return;
        }

        if(gender === ''){
            setError('Gender is Required');
            return;
        }

        if(age === '' || age < 16){
            setError("Age required and must be 16 or older")
            return;
        }

        const result = handleRegister(email, password, name, country, age, gender, phone);
        
        if(!result.success) {
            setError(result.message);
            return;
        }

        // success! go to dashboard
        navigate('/dashboard/myprofile')
    }


  return (
    <div>
        <br />
        <h1>Register</h1>
        <form onSubmit = {handleSubmit}>
            <div>
                <label>Name:</label>
                <br />
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='alon levi..'
                />
            </div>

            <div>
                <label>Email:</label>
                <br />
                <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email@gmail.com'
                />
            </div>

            <div>
                <label>Password:</label>
                <br />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='123*****'
                />
            </div>

            <div>
                <label>Country:</label>
                <br />
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}  
                >
                    <option value="">all countries</option>
                    {apiCountriesList.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Age:</label>
                <br />
                <input 
                    type="number" 
                    value={age}
                    min={16}
                    max={100}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder='24'
                    />
            </div>

            <div>
                <label>Gender:</label>
                <br />
                <select
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}>
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                </select>
            </div>

            <div>
                <label>Phone:</label>
                <br />
                <input 
                    type="text" 
                    value={phone}
                    // min={16}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='051-234-5670'
                    />
            </div>


            {error && <p style={{color: 'red'}}>{error}</p>}
            <br />
            <button type='submit'>Register</button>
        </form>
        <br />
        <hr />
        <h2>already user?</h2>
        <button onClick={() => navigate('/dashboard/myprofile')}>login to your account</button>
    </div>
  )
}
