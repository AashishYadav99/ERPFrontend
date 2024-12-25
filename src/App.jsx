import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideNavbar from "./components/SideNavbar";
import TopNav from "./components/TopNav";
import Warehouse from "./Pages/WareHouse/Warehouse";
import Test from "./Pages/Test";
import AddWarehouse from "./Pages/WareHouse/AddWarehouse";
import Ashish from "./Pages/Ashish";
import Module_Masters from "./Pages/ModuleMaster/Module_Masters";
import Company from "./Pages/Company/Company";
import Location from "./Pages/Location/Location";
import Sub_Module_Master from "./Pages/Sub_ModuleMaster/Sub_Module_Master";
import Add_Sub_Module_Master from "./Pages/Sub_ModuleMaster/Add_Sub_Module_Master";
import Add_Module_Master from "./Pages/ModuleMaster/Add_Module_Master";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleHamburgerClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex w-full h-screen">
      <SideNavbar collapsed={collapsed} />
      <div className="flex-1 flex flex-col">
        <TopNav onHamburgerClick={handleHamburgerClick} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout route */}
        <Route path="/" element={<Layout />}>
          <Route path="/module_master" element={<Module_Masters />} />
          <Route path="/add_module_master" element={<Add_Module_Master />} />
          <Route path="/sub_module_master" element={<Sub_Module_Master />} />
          <Route
            path="/add_sub_module_master"
            element={<Add_Sub_Module_Master />}
          />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/addwarehouse" element={<AddWarehouse />} />
          <Route path="/company" element={<Company />} />
          <Route path="/location" element={<Location />} />
          <Route path="/test" element={<Test />} />
          <Route path="/ashish" element={<Ashish />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
