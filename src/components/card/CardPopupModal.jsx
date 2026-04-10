import CardDetailsModal from './CardDetailsModal';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

export default function CardPopupModal({cardId, onClose}) {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }

  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            // p:0,
            width: '90vw',
            maxWidth: 900,
            maxHeight: 'min(85vh, 680px)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box sx={{position: 'relative', height: '100%'}}>
            <IconButton 
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 9,
                right: 3,
                // m: 1,
                bgcolor: 'background.paper',
                // zIndex: 1100,
                // '&:hover':{
                //   bgcolor: 'background.paper'
                // }
              }}
            >
              <CloseIcon/>
            </IconButton>

            <CardDetailsModal
              cardId = {cardId}
              onClose = {onClose}
            />

          </Box>


        </Box>
    </Box>
  )
}
