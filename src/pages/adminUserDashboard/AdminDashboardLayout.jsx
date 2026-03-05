import { Link, Route, Routes } from "react-router-dom";
import AdminUsersPannel from "./AdminUsersPannel";
import AdminOverViewPannel from "./AdminOverViewPannel";

export default function AdminDashboardLayout() {
  const mystyle = {marginRight: '8px'}

  return(
    <div>
      <div>
        <nav>
          <Link style={mystyle} to={'/admindashboard/overviewpannel'}>Overview</Link>
          <Link style={mystyle} to={'/admindashboard/userspannel'}>Users Pannel</Link>
        </nav>

        <Routes>
          <Route path="/userspannel" element={<AdminUsersPannel/>}/>
          <Route path="/overviewpannel" element={<AdminOverViewPannel/>}/>
        </Routes>
      </div>
    </div>
  )
}
