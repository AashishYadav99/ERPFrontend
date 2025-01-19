import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavbar from "./components/SideNavbar";
import TopNav from "./components/TopNav";
import Warehouse from "./Pages/WareHouse/Warehouse";
import AddWarehouse from "./Pages/WareHouse/AddWarehouse";
import Module_Masters from "./Pages/ModuleMaster/Module_Masters";
import Company from "./Pages/Company/Company";
import Location from "./Pages/Location/Location";
import Sub_Module_Master from "./Pages/Sub_ModuleMaster/Sub_Module_Master";
import Add_Sub_Module_Master from "./Pages/Sub_ModuleMaster/Add_Sub_Module_Master";
import Add_Module_Master from "./Pages/ModuleMaster/Add_Module_Master";
import Loader from "./Pages/Loader";
import Test from "./components/Test";
import Edit_Module_Master from "./Pages/ModuleMaster/Edit_Module_Master";
import Edit_Sub_Module_Master from "./Pages/Sub_ModuleMaster/Edit_Sub_Module_Master";
import Function_Master from "./Pages/FunctionMaster/Function_Master";
import Add_Function_Master from "./Pages/FunctionMaster/Add_Function_Master";
import View_Module_Master from "./Pages/ModuleMaster/View_Module_Master";
import View_Sub_Module_Master from "./Pages/Sub_ModuleMaster/View_Sub_Module_Master";
import View_Function_Master from "./Pages/FunctionMaster/View_Function_Master";
import Edit_Function_Master from "./Pages/FunctionMaster/Edit_Function_Master";
import UserRole from "./Pages/UserRole/UserRole";
import User_Management from "./Pages/UserManagement/User_Management";
import Add_User_Management from "./Pages/UserManagement/Add_User_Management";
import View_User_Management from "./Pages/UserManagement/View_User_Management";
import Edit_User_Management from "./Pages/UserManagement/Edit_User_Management";
import Add_Company from "./Pages/Company/Add_Company";
import Add_Location from "./Pages/Location/Add_Location";
import UserRegisterPage from "./Pages/User/UserRegisterPage";
import UsersList from "./Pages/User/UsersList";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserLoginPage from "./Pages/User/UserLoginPage";
import Add_Role_Master from "./Pages/UserRole/Add_Role_Master";
import Role_Masters from "./Pages/UserRole/Role_Master";
import Edit_Role_Master from "./Pages/UserRole/Edit_Role_Master";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleHamburgerClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex w-full h-screen">
      <SideNavbar collapsed={collapsed} />
      <div className="flex-1 flex flex-col">
        <TopNav onHamburgerClick={handleHamburgerClick} collapsed={collapsed} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  // const [cookies] = useCookies(["authToken"]);
  // const token = cookies.userToken || localStorage.getItem("authToken");
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/userlogin" />;
};

function App() {
  const [cookies, , removeCookie] = useCookies(["authToken"]);
  const token = cookies.userToken || localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        {/* Redirect to dashboard if token exists */}
        <Route
          path="/userlogin"
          element={token ? <Navigate to="/dashboard" /> : <UserLoginPage />}
        />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/module_master" element={<Module_Masters />} />
          <Route path="/add_module_master" element={<Add_Module_Master />} />
          <Route path="/edit_module_master" element={<Edit_Module_Master />} />
          <Route path="/view_module_master" element={<View_Module_Master />} />
          <Route path="/sub_module_master" element={<Sub_Module_Master />} />
          <Route
            path="/add_sub_module_master"
            element={<Add_Sub_Module_Master />}
          />
          <Route
            path="/edit_sub_module_master"
            element={<Edit_Sub_Module_Master />}
          />
          <Route
            path="/view_sub_module_master"
            element={<View_Sub_Module_Master />}
          />
          <Route path="/function_master" element={<Function_Master />} />
          <Route
            path="/add_function_master"
            element={<Add_Function_Master />}
          />
          <Route
            path="/edit_function_master"
            element={<Edit_Function_Master />}
          />
          <Route
            path="/view_function_master"
            element={<View_Function_Master />}
          />

          <Route path="/user_management" element={<User_Management />} />
          <Route
            path="/add_user_management"
            element={<Add_User_Management />}
          />
          <Route
            path="/view_user_management"
            element={<View_User_Management />}
          />
          <Route
            path="/edit_user_management"
            element={<Edit_User_Management />}
          />

          <Route path="/userrole" element={<UserRole />} />
          <Route path="/role_master" element={<Role_Masters />} />
          <Route path="/add_role_master" element={<Add_Role_Master />} />
          <Route path="/edit_role_master" element={<Edit_Role_Master />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/addwarehouse" element={<AddWarehouse />} />
          <Route path="/company" element={<Company />} />
          <Route path="/add_company" element={<Add_Company />} />
          <Route path="/location" element={<Location />} />
          <Route path="/add_location" element={<Add_Location />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/test" element={<Test />} />
          <Route path="/userlogin" element={<UserLoginPage />} />
          <Route
            path="/user_registration_page"
            element={<UserRegisterPage />}
          />
          <Route path="/user_list" element={<UsersList />} />

          {/* </Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
