import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
import AdminDashboardLayout from './pages/adminUserDashboard/AdminDashboardLayout'
import AdminProtectedRoute from './components/AdminProtectedRoute'


export default function App(){
  return(
    <AuthProvider>
      <ThemeProvider>
        <CardsProvider>
          <NavBar/>
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
              <Route path='/login' element={<LoginPage/>}/>
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
              <Route path='/registered' element ={<RegisteredPage/>}/>
              <Route path='/allcards' element ={<AllCardsPage/>}/>
              <Route path='/carddetails/:id' element ={<CardDetailsPage/>}/>
            </Routes>
        </CardsProvider>
      </ThemeProvider>
    </AuthProvider>  
  )
}