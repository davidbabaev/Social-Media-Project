import { Link, Route, Routes } from "react-router-dom";
import AdminUsersPanel from "./AdminUsersPanel";
import AdminOverViewPanel from "./AdminOverViewPanel";

export default function AdminDashboardLayout() {
  const mystyle = {marginRight: '8px'}

  return(
    <div>
      <div style={{display: 'flex'}}>
        <nav style={{display: 'flex', width: '150px' , flexDirection: 'column', backgroundColor: 'lightgray', margin: '10px', padding: '10px', borderRadius: '15px'}}>
          <Link style={mystyle} to={'/admindashboard/overviewpanel'}>Overview</Link>
          <Link style={mystyle} to={'/admindashboard/userspanel'}>Users Panel</Link>
          <Link style={mystyle} to={'/'}>back to Feed 🏠︎</Link>
        </nav>
        <div style={{display: 'flex', flexDirection: 'column', border: '1px solid lightgray', margin: '10px', padding: '10px', borderRadius: '15px'}}>
          <Routes>
            <Route path="/userspanel" element={<AdminUsersPanel/>}/>
            <Route path="/overviewpanel" element={<AdminOverViewPanel/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}
