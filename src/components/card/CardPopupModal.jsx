import CardDetailsModal from './CardDetailsModal';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CardPopupModal({cardId, onClose}) {
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
        alignItems: 'center'
      }}
    >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            p: 3,
            width: 900,
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}
        >
            <IconButton 
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
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
  )
}
