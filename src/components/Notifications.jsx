import React from 'react'
import useUsers from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { useCardsProvider } from '../providers/CardsProvider';
import getTimeAgo from '../utils/getTimeAgo';

export default function Notifications({notificationsValue, handleDeleteNotificationValue}) {

  const styleP = {
    position: 'absolute',
    top: '40px',
    right: 0,
    backgroundColor: 'white', 
    zIndex: '1000',
    borderRadius: '10px',
    border: '1px solid lightGray',
    padding: '10px',
    width: '400px'
  }

  const {users} = useUsers();
  const navigate = useNavigate();
  const {registeredCards} = useCardsProvider();

  if(!notificationsValue || !users) return <p>Loading..</p>

  return (
    <div style={styleP}>
      {notificationsValue.map((notification) => {

        const notificationSenderUser = users.find(u => u._id === notification.fromUser)
        const notificationOnCard = registeredCards.find(c => c._id === notification.whichCard)

        return(
          <div key={notification._id}>
            <img style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px, solid, white',
              objectFit: 'cover',
              cursor: 'pointer'
              }} 
              src={notificationSenderUser?.profilePicture}
              onClick={() => navigate(`/profiledashboard/${notificationSenderUser?._id}/profilemain`)}
              />

            <div style={{display: 'flex', gap: '6px', alignItems: 'center'}}>
              <p 
                  style={{justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold'}}
                  onClick={() => navigate(`/profiledashboard/${notificationSenderUser?._id}/profilemain`)}
              >
                  {notificationSenderUser?.name} {notificationSenderUser?.lastName}  
              </p>

              {(notification?.actionType === "like" || notification?.actionType === "comment") && (
                <p>
                  {notification?.actionType}s your post:
                  {' '}
                  <span
                    onClick={() => navigate(`/carddetails/${notificationOnCard?._id}`)}
                    style={{fontWeight: 'bold', cursor: 'pointer'}}
                  >{notificationOnCard?.title}</span>
                </p>
              )}

              {(notification?.actionType === "follow") && (
                <p> 
                  {notification?.actionType} you
                </p>
              )}

              <p 
                style={{
                    color: 'gray', 
                    fontSize:'13px', 
                    margin: 0,
                }}
                >
                {getTimeAgo(notification.createdAt)}
              </p>

              <button onClick={() => handleDeleteNotificationValue(notification._id)}>🗑️Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
