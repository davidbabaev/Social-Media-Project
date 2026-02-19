import React, { useMemo, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider';
import useAllUsers from '../../hooks/useAllUsers';
import useCountries from '../../hooks/useCountries';
import { JOB_INDUSTRIES } from '../../constants/usersJobIndustries';
import getMaxBirthDate from '../../utils/getMaxBirthDate';

export default function ProfileSection() {

    const {user} = useAuth(); // only works for registered
    const {apiCountriesList} = useCountries(); 
    const {allUsers, editAnyUser} = useAllUsers();
    
    // edit logged-in user values states:
    const [editName, setEditName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const [editCity, setEditCity] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
    const [editCoverImage, setEditCoverImage] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editJob, setEditJob] = useState('');
    const [editGender, setEditGender] = useState('');
    const [editBirthDate, setEditBirthDate] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAboutMe, setEditAboutMe] = useState('');    

    const [editMode, setEditMode] = useState(false);

    const maxDate = useMemo(() => getMaxBirthDate(), []);
    

    // import edit function that we need to initial in the AuthProvider page
    
    const currentUser = useMemo(() => {
      const currentUser = allUsers.find(loggedUser => loggedUser.userId === user.userId);
      return currentUser;
    }, [allUsers]) 

    if(!currentUser) return <p>Loading...</p>
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
            <img style={{width: '100%', borderRadius: '10px', height:'230px', objectFit:'cover'}} src={currentUser.coverImage}/>
            <img style={{marginTop: '-100px',marginLeft: '20px',width: '17%', borderRadius: '50%', border: 'solid 2px white', objectFit:'cover', height:'170px'}} src={currentUser.photo}/>
            <h2>{currentUser.name} {currentUser.lastName}</h2>
            <hr />
            <p><span style={{fontWeight:'bold', fontSize: '20px'}}>About</span><br/> {currentUser.aboutMe}</p>
            <hr />
            <p>Email: {currentUser.email}</p>
            <p>Country: {currentUser.country}</p>
            <p>City: {currentUser.city}</p>
            <p>Age: {currentUser.age}</p>
            <p>Job: {currentUser.job}</p>
            <p>Gender: {currentUser.gender}</p>
            <p>Phone: {currentUser.phone}</p>
            <p>Source: {currentUser.source}</p>

            <button onClick={() => {
                setEditMode(!editMode);
                setEditName(currentUser.name);
                setEditLastName(currentUser.lastName);
                setEditEmail(currentUser.email);
                setEditCountry(currentUser.country);
                setEditCity(currentUser.city);
                setEditPhoto(currentUser.photo);
                setEditCoverImage(currentUser.coverImage);
                setEditAge(currentUser.age);
                setEditJob(currentUser.job);
                setEditGender(currentUser.gender);
                setEditBirthDate(currentUser.birthDate);
                setEditPhone(currentUser.phone);
                setEditAboutMe(currentUser.aboutMe);
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
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
            </div>

            <div>
                <label>Edit City:</label>
                <br />
                <input 
                    type="text" 
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    placeholder={editCity}
                />
            </div>

            <div>
            <label>Edit Profile Image:</label>
            <br />
            <input type="text" 
                value={editPhoto}
                onChange={(e) => setEditPhoto(e.target.value)}
                placeholder= {editPhoto}
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
            <label>Edit Age:</label>
            <br />
            <input type="number" 
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                placeholder= {editAge}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
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
                    <small>You must be at least 5 years old</small>
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
            onClick={
                () => {
                editAnyUser(
                    currentUser.userId,
                    {
                        name: editName,
                        lastName: editLastName,
                        email: editEmail,
                        country: editCountry,
                        city: editCity,
                        photo: editPhoto,
                        coverImage: editCoverImage,
                        age: editAge,
                        gender: editGender,
                        phone: editPhone,
                        job: editJob,
                        birthDate: editBirthDate,
                        aboutMe: editAboutMe,
                    }
                )
                setEditMode(!editMode)
                }}
            >Save Edits</button>
            <button onClick={() => setEditMode(!editMode)}>Cancel Edit Mode</button>

        </div>
    )}
</div>
)
}
