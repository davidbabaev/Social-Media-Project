import React from 'react'
import useUsers from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { useCardsProvider } from '../providers/CardsProvider';
import getTimeAgo from '../utils/getTimeAgo';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Notifications({notificationsValue, handleDeleteNotificationValue}) {

  const {users} = useUsers();
  const navigate = useNavigate();
  const {registeredCards} = useCardsProvider();

  if(!notificationsValue || !users) return <p>Loading..</p>

  return (
    <Box sx={{
      position: 'absolute',
      top: '48px',
      right: 0,
      width: 380,
      bgcolor: 'background.paper',
      borderRadius: 2,
      border: '0.5px solid',
      borderColor: 'divider',
      zIndex: 1000
    }}>
      <Box sx={{
        px: 2,
        py: 1.5, 
        borderBottom: '0.5px solid',
        borderColor: 'divider'
      }}>
        <Typography 
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: 'text.primary'
          }}>
          Notifications
        </Typography>
      </Box>

      <List disablePadding>
        {notificationsValue.map((notification) => {
          const notificationSenderUser = users.find(u => u._id === notification.fromUser)
          const notificationOnCard = registeredCards.find(c => c._id === notification.whichCard)

          const actionText = notification.actionType === 'follow' 
          ? 'followed you'
          : `${notification.actionType}d your post: ${notificationOnCard?.title}`

          return(
            <ListItem 
              key={notification._id}
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: '0.5px solid',
                borderColor: 'divider',
                '&:last-child': {borderBottom: 'none'},
                '&:hover': {bgcolor: 'action.hover'}
              }}
            >
              <ListItemAvatar sx={{maxWidth: 44}}>
                <Avatar 
                  sx={{width: 36, height: 36, cursor: 'pointer'}}
                  src={notificationSenderUser?.profilePicture}
                  onClick={() => navigate(`/profiledashboard/${notificationSenderUser?._id}/profilemain`)}
                />
              </ListItemAvatar>

              <ListItemText
                primary={`${notificationSenderUser?.name} ${notificationSenderUser?.lastName} ${actionText}`}
                secondary={getTimeAgo(notification.createdAt)}
                slotProps={{
                  primary:{
                    fontSize: 13,
                    color: 'text.primary',
                    fontWeight: 500,
                  },
                  secondary: {
                    fontSize: 11,
                    color: 'text.secondary'
                  }
                }}
              />

              <IconButton
                sx={{color: 'text.disabled', '&:hover' : {color: 'error.main'}}}
                onClick={() => handleDeleteNotificationValue(notification._id)}
              >
                <DeleteIcon fontSize='small'/>
              </IconButton>

            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
