import React, { useMemo, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider';
import useCountries from '../../hooks/useCountries';
import { JOB_INDUSTRIES } from '../../constants/usersJobIndustries';
import useCities from '../../hooks/useCities';
import { getMaxBirthDate, getAgeByDate } from '../../utils/getAgeByBirthDate';

export default function ProfileSection() {

    const {user, editUser} = useAuth(); // only works for registered
    const {apiCountriesList} = useCountries(); 

    // edit logged-in user values states:
    const [editName, setEditName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const [editCity, setEditCity] = useState('');
    const [editprofilePicture, setEditprofilePicture] = useState('');
    const [editCoverImage, setEditCoverImage] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editJob, setEditJob] = useState('');
    const [editGender, setEditGender] = useState('');
    const [editBirthDate, setEditBirthDate] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAboutMe, setEditAboutMe] = useState('');   
    
    const {cities, isCitiesLoading} = useCities(editCountry);
    

    const [editMode, setEditMode] = useState(false);

    const maxDate = useMemo(() => getMaxBirthDate(13), []);
    
    // import edit function that we need to initial in the AuthProvider page

    if(!user) return <p>Loading...</p>
return (
<div>
    <h2>My Profile</h2>
    {!editMode ? (
        <div
            style={{
            border: 'solid black 1px', 
            padding: '20px', 
            borderRadius: '20px', 
            margin: '20px 0px'
            }}
            >
            <img style={{width: '100%', borderRadius: '10px', height:'230px', objectFit:'cover'}} src={user.coverImage}/>
            <img style={{marginTop: '-100px',marginLeft: '20px',width: '17%', borderRadius: '50%', border: 'solid 2px white', objectFit:'cover', height:'170px'}} src={user.profilePicture}/>
            <h2>{user.name} {user.lastName}</h2>
            <hr />
            <p><span style={{fontWeight:'bold', fontSize: '20px'}}>About</span><br/> {user.aboutMe}</p>
            <hr />
            <p>Email: {user.email}</p>
            <p>Country: {user.address?.country}</p>
            <p>City: {user.address?.city}</p>
            <p>Age: {user.age}</p>
            <p>Job: {user.job}</p>
            <p>Gender: {user.gender}</p>
            <p>Phone: {user.phone}</p>
            <p>Birth Date: {user.birthDate?.split("T")[0]}</p>
            <p>Registered At: {user.createdAt?.split("T")[0]}</p>

            <button onClick={() => {
                setEditMode(!editMode);
                setEditName(user.name);
                setEditLastName(user.lastName);
                setEditEmail(user.email);
                setEditCountry(user.address?.country);
                setEditCity(user.address?.city);
                setEditprofilePicture(user.profilePicture);
                setEditCoverImage(user.coverImage);
                setEditJob(user.job);
                setEditAge(user.age)
                setEditGender(user.gender);
                setEditBirthDate(user.birthDate.split("T")[0]);
                setEditPhone(user.phone);
                setEditAboutMe(user.aboutMe);
            }
            }>Edit Profile</button>

        </div>

    ): (
        <div 
            style={{
            border: 'solid black 1px', 
            padding: '20px', 
            borderRadius: '20px', 
            margin: '20px 0px'
            }}
        >
            <div>
            <label>Edit Name:</label>
            <br />
            <input type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder= {editName}
                />
            </div>

            <div>
            <label>Last Name:</label>
            <br />
            <input type="text" 
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
                placeholder= {editLastName}
                />
            </div>

            <div>
            <label>Edit Email:</label>
            <br />
            <input type="text" 
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder= {editEmail}
                />
            </div>

            <div>
            <label>Edit Country:</label>
            <br />
            <select 
                value={editCountry}
                onChange={(e) => setEditCountry(e.target.value)}  
            >
                <option value="">All</option>
                {apiCountriesList.map((country) => (
                    <option key={country.code} value={country.name}>{country.name}</option>
                ))}
            </select>
            </div>

            <div>
                <label>Edit City:</label>
                <br />
                <select 
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    // wrong--> {...country === '' && disabled}
                    disabled = {editCountry === '' || isCitiesLoading}
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
            <label>Edit Profile Image:</label>
            <br />
            <input type="text" 
                value={editprofilePicture}
                onChange={(e) => setEditprofilePicture(e.target.value)}
                placeholder= {editprofilePicture}
                />
            </div>

            <div>
            <label>Edit Cover Image:</label>
            <br />
            <input type="text" 
                value={editCoverImage}
                onChange={(e) => setEditCoverImage(e.target.value)}
                placeholder= {editCoverImage}
                />
            </div>

            <div>
                <label>Job:</label>
                <br />
                <select 
                    value={editJob}
                    onChange={(e) => setEditJob(e.target.value)}
                >
                    <option value="">All</option>
                    {JOB_INDUSTRIES.map((job) => (
                        <option key={job} value={job}>{job}</option>
                    ))}
                </select>
            </div>

            <div>
            <label>Edit Gender</label>
            <br />
            <select 
                value={editGender}
                onChange={(e) => setEditGender(e.target.value)}
            >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            </div>

            <div>
                <label>Birth Date:</label>
                <br />
                <input 
                    type="date" 
                    value={editBirthDate}
                    onChange={(e) => setEditBirthDate(e.target.value)}
                    max={maxDate}
                    />
                    <br />
                    <small>You must be at least 13+ years old</small>
            </div>

            <div>
            <label>Edit Phone:</label>
            <br />
            <input type="text" 
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder= {editPhone}
                />
            </div>

            <div>
                <label>Edit About Me:</label>
                <br />
                <textarea
                    value={editAboutMe}
                    onChange={(e) => setEditAboutMe(e.target.value)}
                    style={{resize: 'none'}}
                    rows={4}
                />
            </div>

            <br />

            <button
            onClick={async() => {
                const result = await editUser(
                    user._id,
                    {
                        name: editName,
                        lastName: editLastName,
                        email: editEmail,
                        address: {
                            country: editCountry,
                            city: editCity,
                        },
                        profilePicture: editprofilePicture,
                        coverImage: editCoverImage,
                        age: getAgeByDate(editBirthDate),
                        gender: editGender,
                        phone: editPhone,
                        job: editJob,
                        birthDate: editBirthDate,
                        aboutMe: editAboutMe,
                    }
                )
                if(result.success){
                    setEditMode(false);
                } else{
                    alert(result.message)
                }
                }}
            >Save Edits</button>
            <button onClick={() => setEditMode(!editMode)}>Cancel Edit Mode</button>

        </div>
    )}
</div>
)
}
