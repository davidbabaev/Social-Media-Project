// new component with internal nav + nested <Routes>


import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import SelectedPage from '../SelectedPage'
import ProfileSection from './ProfileSection'
import CardsRegisterPage from '../CardsRegisterPage'
import MyCardsSection from './MyCardsSection'

export default function DashboardLayout() {


    const mystyle = {marginRight: '8px'}

    return (
        <div>
            <nav>
                <Link style={mystyle} to={'/dashboard/myprofile'} >Profile</Link>
                <Link style={mystyle} to={'/dashboard/mycards'} >My Cards</Link>
                <Link style={mystyle} to={'/dashboard/myfavorites'} >Favorites</Link>
                <Link style={mystyle} to={'/dashboard/createnewcard'} >Create Card</Link>
            </nav>

            <Routes>
                <Route path='/myprofile' element={<ProfileSection/>}/>
                <Route path='/mycards' element={<MyCardsSection/>}/>
                <Route path='/myfavorites' element={<SelectedPage/>}/>
                <Route path='/createnewcard' element={<CardsRegisterPage/>}/>
            </Routes>
        </div>
    )
}
