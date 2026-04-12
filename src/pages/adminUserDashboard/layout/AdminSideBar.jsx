import { Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';

export default function AdminSideBar({isOpen}) {

    const navItemOpen = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1,
        bgcolor: isActive ? 'action.selected' : 'transparent',
        borderRadius: 3,
        borderLeft: isActive ? '3px solid' : 'none',
        borderColor: 'primary.main',
        color: isActive ? 'primary.main' : 'text.secondary',
        cursor: 'pointer',
    })

    const navItemClosed = (isActive) => ({
        display: 'flex',
        justifyContent: 'center',
        py: 1,
        p: 1.5,
        bgcolor: isActive ? 'action.selected' : 'transparent',
        borderRadius: 3,
        color: isActive ? 'primary.main' : 'text.secondary',
        cursor: 'pointer',
    })

    const navItems = [
        {label: 'Dashboard', icon: <LeaderboardIcon fontSize='small'/>, path: '/admindashboard/overviewpanel'},
        {label: 'Users', icon: <GroupIcon fontSize='small'/>, path: '/admindashboard/userspanel'},
        {label: 'Posts', icon: <ArticleIcon fontSize='small'/>, path: '/admindashboard/cardspanel'},
        {label: 'Home', icon: <HomeIcon fontSize='small'/>, path: '/'},
    ]

    const navigate = useNavigate();

  return (
    <Box sx={{
        width: {xs: isOpen ? 180 : 0,md: isOpen ? 210 : 90},
        transition: 'width 0.3s',
        overflow: 'hidden',
        bgcolor: 'action.selected',
        mr: 2,
        borderRight: '1px solid', 
        borderColor: 'divider',
        position: 'sticky',
        top: {xs: 0,md:64},
        height: 'calc(100vh - 64px)'
    }}>

        <Toolbar sx={{display: 'flex', flexDirection: 'column', gap: 1, py: 2, alignItems: 'start'}}>
            {navItems.map((item) => (
                <Box
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    sx={isOpen
                        ? navItemOpen(location.pathname === item.path)
                        : navItemClosed(location.pathname === item.path)
                    }
                    >
                    {item.icon}
                    {isOpen && (
                        <Typography fontSize={14} variant='caption'>{item.label}</Typography>
                    )}
                </Box>
            ))}
        </Toolbar>
    </Box>
  )
}
