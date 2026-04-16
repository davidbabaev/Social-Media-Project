import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { CardsProvider } from './providers/CardsProvider'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import CardsRegisterPage from './pages/CardsRegisterPage'
import RegisteredPage from './pages/RegisteredPage'
import AllCardsPage from './pages/AllCardsPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import CardDetailsPage from './pages/CardDetailsPage'
import UserProfileLayout from './pages/userProfilePublicLayout/UserProfileLayout'
import UsersPage from './pages/UsersPage'
import FeedPage from './pages/FeedPage'
import AdminDashboardLayout from './pages/adminUserDashboard/layout/AdminDashboardLayout'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import PaginationDiagram from '../codes backups/Paigination'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import { Box } from '@mui/material'
import socket from './services/socketService';
import ChatPage from './pages/chat/ChatPage'

export default function App(){

  const location = useLocation()
  
  return(
    <AuthProvider>
      <ThemeProvider>
        <CardsProvider>
          {!(
            location.pathname.includes('/admindashboard') ||
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
          ) && (
            <NavBar/>
          )}
          <Box sx={{minHeight: '100vh', bgcolor: 'Background.default'}}>
            <Routes>
              <Route path='/' element={
                <ProtectedRoute>
                  <FeedPage/>
                </ProtectedRoute>
              }/>
              <Route path='/admindashboard/*' element={
                <AdminProtectedRoute> 
                  <AdminDashboardLayout/>
                </AdminProtectedRoute>
              }/>
              <Route path='/login' element={
                <PublicOnlyRoute>
                  <LoginPage/>
                </PublicOnlyRoute>
              }/>
              <Route path='/dashboard/*' element={
                <ProtectedRoute>
                  <DashboardLayout/>
                </ProtectedRoute>
              }/>
              <Route path='/profiledashboard/:id/*' element={<UserProfileLayout/>}/>
              <Route path='/createnewcard' element={
                <ProtectedRoute>
                  <CardsRegisterPage/>
                </ProtectedRoute>
              }/>
              <Route path='/allusers' element ={<UsersPage/>}/>
              <Route path='/recall' element ={<PaginationDiagram/>}/>
              <Route path='/registered' element ={
                <PublicOnlyRoute>
                  <RegisteredPage/>
                </PublicOnlyRoute>
              }/>
              <Route path='/allcards' element ={<AllCardsPage/>}/>
              <Route path='/carddetails/:id' element ={<CardDetailsPage/>}/>
              <Route path='/chat' element={
                  <ProtectedRoute>
                  <ChatPage/>
                </ProtectedRoute>
              }/>
            </Routes>
          </Box>
        </CardsProvider>
      </ThemeProvider>
    </AuthProvider>  
  )
}