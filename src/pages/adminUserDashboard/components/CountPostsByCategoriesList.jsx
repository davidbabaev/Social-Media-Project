import React from 'react'
import useAnalytics from '../hooks/useAnalytics'
import { Box, Chip, Typography } from '@mui/material';

export default function CountPostsByCategoriesList() {

    const {arrayCountPerCategory} = useAnalytics();

  return (
    <Box 
        sx={{
            display: 'flex', 
            flexDirection: 'column',
            border: '1px solid',
            borderRadius: 3,
            borderColor: 'divider',
            p: 2,
            bgcolor: 'background.paper'
        }}
    >
        <Typography fontWeight={700} fontSize={15}>Posts per catrgories</Typography>

        <Box>
            {arrayCountPerCategory.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display:'flex',
                        justifyContent: 'space-between',
                        gap: 7,
                        pt: 1
                    }}
                >   
                    <Typography fontSize={14}>{item.name}</Typography>
                    <Chip color={'text.secondary'} sx={{fontSize: 11}} size='small' label = {item.posts}/>
                </Box>
            ))}
        </Box>
    </Box>
  )
}
