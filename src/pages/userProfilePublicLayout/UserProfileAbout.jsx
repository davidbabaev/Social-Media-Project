import React from 'react'
import useUsers from '../../hooks/useUsers'
import { useParams } from 'react-router-dom';

export default function UserProfileAbout() {

  const {users} = useUsers();
  const {id} = useParams();

  const userProfile = users.find((user) => user._id === id);

  if(!userProfile) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>About Me</h1>
      <p>{userProfile.aboutMe}</p>

      <hr />
      <h2>Details</h2>
      <p>Email: {userProfile.email}</p>
      <p>Country: {userProfile.address?.country}</p>
      <p>City: {userProfile.address?.city}</p>
      <p>Age: {userProfile.age}</p>
      <p>Job: {userProfile.job}</p>
      <p>Gender: {userProfile.gender}</p>
      <p>Phone: {userProfile.phone}</p>
      <p>Joined On: {userProfile.createdAt.split("T")[0]}</p>
    </div>
  )
}
