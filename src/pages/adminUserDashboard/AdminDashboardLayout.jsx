import { Link, Route, Routes } from "react-router-dom";
import AdminUsersPanel from "./AdminUsersPanel";
import AdminOverViewPanel from "./AdminOverViewPanel";
import AdminCardsPanel from "./AdminCardsPanel";

export default function AdminDashboardLayout() {
  const mystyle = {marginRight: '8px', textDecoration: 'none', backgroundColor: 'white', margin: '5px', padding: '10px', borderRadius: '10px', width: '130px'}

  return(
    <div>
      <div style={{display: 'flex'}}>
        <div>
          <nav style={{display: 'flex' , flexDirection: 'column', backgroundColor: 'lightgray', margin: '10px', padding: '10px', borderRadius: '15px'


          }}>
            <Link style={mystyle} to={'/admindashboard/overviewpanel'}>Overview 📊</Link>
            <Link style={mystyle} to={'/admindashboard/userspanel'}>Users Panel 👤</Link>
            <Link style={mystyle} to={'/admindashboard/cardspanel'}>Cards Panel 📝</Link>
            <Link style={mystyle} to={'/'}>Back to feed 🏠︎</Link>
          </nav>

        </div>
        <div style={{display: 'flex', flexDirection: 'column', border: '1px solid lightgray', margin: '10px', padding: '10px', borderRadius: '15px'}}>
          <Routes>
            <Route path="/userspanel" element={<AdminUsersPanel/>}/>
            <Route path="/overviewpanel" element={<AdminOverViewPanel/>}/>
            <Route path="/cardspanel" element={<AdminCardsPanel/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}
