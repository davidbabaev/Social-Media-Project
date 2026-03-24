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
                    onChange={handleCountryChange}  
                >
                    <option value="">all countries</option>
                    {apiCountriesList.map((country) => (
                        <option key={country.code} value={country.name}>{country.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>city:</label>
                <br />
                <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    // wrong--> {...country === '' && disabled}
                    disabled = {country === '' || isCitiesLoading}
                >
                    <option value="">All</option>
                    {cities.map((cityApi) => (
                        <option
                            key={cityApi} 
                            value={cityApi}
                        >
                            {cityApi}
                        </option>
                    ))}
                </select>
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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
                    <small>You must be at least 13+ years old</small>
            </div>

            <div>
                <label>Phone:</label>
                <br />
                <input 
                    type="text" 
                    value={phone}
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
        <Button variant="outlined" onClick={() => navigate('/dashboard/myprofile')}>login With Email/Pssword</Button>
        <Button 
            sx={{margin:'10px'}} 
            variant="outlined" 
            startIcon={<GoogleIcon/>}
            href='/auth/google'
        >
            Login With Google
        </Button>
    </div>
  )