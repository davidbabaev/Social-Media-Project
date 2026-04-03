import React from 'react'
import { useNavigate } from 'react-router-dom';
import useSelectedUsers from '../../hooks/useSelectedUsers';


export default function SelectedPage() {

    const {selectedUsers, handleRemoveUser} = useSelectedUsers()


    const navigate = useNavigate();

  return (
    <div>
        <div>
            <h2>Selected Users</h2>
            {!selectedUsers[0] && (<p>You Didn't Select Users  Yet</p>)}
            {selectedUsers.map((selected) => (
                <div key={selected._id}>
                    <img style={{borderRadius: '50%', width: '100px'}} src={selected.profilePicture}/>
                    <p>{selected.name}</p>
                    <button onClick={() => handleRemoveUser(selected)}>Remove</button>
                    <button onClick={() => navigate(`/userprofile/${selected._id}`)}>to the user page</button>
                    <hr />
                </div>
            ))}
        </div>


        
        
    </div>
  )
}
