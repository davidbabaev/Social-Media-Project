import React, { useMemo, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom';
import useCountries from '../hooks/useCountries';
import { JOB_INDUSTRIES } from '../constants/usersJobIndustries';
import getMaxBirthDate from '../utils/getMaxBirthDate';

export default function RegisteredPage() {
    
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [aboutMe, setAboutMe] = useState('');


    const {handleRegister} = useAuth();
    const {apiCountriesList} = useCountries();

    // navigation
    const navigate = useNavigate();

    // BirthDate function, handling
    const maxDate = useMemo(() => getMaxBirthDate(), []);

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

        const result = handleRegister(
            email, 
            password, 
            name, 
            country, 
            age, 
            gender, 
            phone, 
            lastName, 
            city,
            job,
            birthDate,
            aboutMe,
        );
        
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
                    placeholder='Alon..'
                />
            </div>

            <div>
                <label>Last Name:</label>
                <br />
                <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Levi..'
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
                <label>city:</label>
                <br />
                <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Viena'
                />
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
                <label>Job:</label>
                <br />
                <select 
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                >
                    <option value="">All</option>
                    {JOB_INDUSTRIES.map((job) => (
                        <option key={job} value={job}>{job}</option>
                    ))}
                </select>
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
                <label>Birth Date:</label>
                <br />
                <input 
                    type="date" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={maxDate}
                    />
                    <br />
                    <small>You must be at least 5 years old</small>
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

            <div>
                <label>About Me:</label>
                <br />
                <textarea
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    style={{resize: 'none'}}
                    rows={4}
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

