import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { CardsProvider } from './providers/CardsProvider'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserDashboard from './pages/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import CardsRegisterPage from './pages/CardsRegisterPage'
import SelectedPage from './pages/SelectedPage'
import DisplayUsers from './components/DisplayUsers'
import RegisteredPage from './pages/RegisteredPage'
import AllCardsPage from './pages/AllCardsPage'
import UserProfile from './pages/UserProfile'


export default function App(){
  return(
    <AuthProvider>
      <ThemeProvider>
        <CardsProvider>
          <NavBar/>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/dashboard' element={
                <ProtectedRoute>
                  <UserDashboard/>
                </ProtectedRoute>
              }/>
              <Route path='/createnewcard' element={
                <ProtectedRoute>
                  <CardsRegisterPage/>
                </ProtectedRoute>
              }/>
              <Route path='/selectedpage' element ={<SelectedPage/>}/>
              <Route path='/allusers' element ={<DisplayUsers/>}/>
              <Route path='/registered' element ={<RegisteredPage/>}/>
              <Route path='/allcards' element ={<AllCardsPage/>}/>
              <Route path='/userprofile/:id' element ={<UserProfile/>}/>
            </Routes>
        </CardsProvider>
      </ThemeProvider>
    </AuthProvider>  
  )
}