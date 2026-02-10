import React, { useMemo, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider';
import useAllUsers from '../../hooks/useAllUsers';
import useCountries from '../../hooks/useCountries';

export default function ProfileSection() {

    const {user, editUser} = useAuth();
    const {allUsers} = useAllUsers();
    const {apiCountriesList} = useCountries(); 
    
    // edit logged-in user values states:
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editGender, setEditGender] = useState('');
    const [editPhone, setEditPhone] = useState('');

    const [editMode, setEditMode] = useState(false);

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
            <img style={{width: '100px', borderRadius: '50%'}} src={currentUser.photo}/>
            <h3>{currentUser.name}</h3>
            <p>Email: {currentUser.email}</p>
            <p>Country: {currentUser.country}</p>
            <p>Age: {currentUser.age}</p>
            <p>Gender: {currentUser.gender}</p>
            <p>Phone: {currentUser.phone}</p>
            <p>Source: {currentUser.source}</p>

            <button onClick={() => {
            setEditMode(!editMode);
            setEditName(currentUser.name);
            setEditEmail(currentUser.email);
            setEditCountry(currentUser.country);
            setEditPhoto(currentUser.photo);
            setEditAge(currentUser.age);
            setEditGender(currentUser.gender);
            setEditPhone(currentUser.phone);
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
            <label>Edit Photo:</label>
            <br />
            <input type="text" 
                value={editPhoto}
                onChange={(e) => setEditPhoto(e.target.value)}
                placeholder= {editPhoto}
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
            <label>Edit Phone:</label>
            <br />
            <input type="text" 
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder= {editPhone}
                />
            </div>

            <br />

            <button
            onClick={
                () => {
                editUser( currentUser.userId ,editName, editEmail, editCountry, editPhoto, editAge, editGender, editPhone)
                setEditMode(!editMode)
                }}
            >Save Edits</button>
            <button onClick={() => setEditMode(!editMode)}>Cancel Edit Mode</button>

        </div>
    )}
</div>
)
}
