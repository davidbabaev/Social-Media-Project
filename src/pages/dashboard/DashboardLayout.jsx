import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import SelectedPage from '../SelectedPage'
import ProfileSection from './ProfileSection'
import CardsRegisterPage from '../CardsRegisterPage'
import MyCardsSection from './MyCardsSection'
import FavoriteCards from '../FavoriteCards'

export default function DashboardLayout() {


    const mystyle = {marginRight: '8px'}

    return (
        <div>
            <nav>
                <Link style={mystyle} to={'/dashboard/myprofile'} >Profile</Link>
                <Link style={mystyle} to={'/dashboard/mycards'} >My Cards</Link>
                <Link style={mystyle} to={'/dashboard/myfavorites'} >Favorite Users</Link>
                <Link style={mystyle} to={'/dashboard/myfavoritescards'} >Favorite Cards</Link>
                <Link style={mystyle} to={'/dashboard/createnewcard'} >Create Card</Link>
            </nav>

            <Routes>
                <Route path='/myprofile' element={<ProfileSection/>}/>
                <Route path='/mycards' element={<MyCardsSection/>}/>
                <Route path='/myfavorites' element={<SelectedPage/>}/>
                <Route path='/myfavoritescards' element={<FavoriteCards/>}/>
                <Route path='/createnewcard' element={<CardsRegisterPage/>}/>
            </Routes>
        </div>
    )
}
