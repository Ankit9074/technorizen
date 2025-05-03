// import React from 'react'
// import "../../../inner_page_style.css" 
import { useState } from "react";
import { useSidebar } from "../../../context/SidebarContext";
interface SidebarProps {
  collapsed: boolean;
}
function Sidebar({collapsed}) {
  return (
   <Sidebar2 collapsed={collapsed} />
  )
}

export default Sidebar

export const SidebarUi=()=>{
    return(<>
    <div>
    <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
        <div className="mobile-sidebar-header d-md-none">
          <div className="header-logo">
            <a href="index.html">
              <img src="/src/assets/imgs/logo.png" alt="logo" />
            </a>
          </div>
        </div>
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li className="nav-item">
              <a href="dashboard.html" className="nav-link">
                <i className="flaticon-menu-1" /> <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="myprojects.html" className="nav-link">
                <i className="fa fa-file" />
                <span>My Projects</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="templates.html" className="nav-link">
                <i className="fa fa-image" />
                <span>Templates</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="resources.html" className="nav-link">
                <i className="fa fa-object-group" />
                <span>Resources</span>
              </a>
            </li>
            <li className="nav-item active">
              <a href="drafts.html" className="nav-link">
                <i className="fa fa-edit" />
                <span>Drafts</span>
              </a>
            </li>
          </ul>
          <ul className="nav nav-sidebar-menu sidebar-toggle-view border-top mt-100">
            <li className="nav-item">
              <a href="setting.html" className="nav-link">
                <i className="fa fa-cog" />
                <span>Setting</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="index.html" className="nav-link">
                <i className="flaticon-turn-off" />
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    </>)
}


import { Link } from 'react-router-dom';

const Sidebar1 = () => {
    return (
        <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
            <div className="mobile-sidebar-header d-md-none">
                <div className="header-logo">
                    <a href="index.html"><img src="img/logo1.png" alt="logo" /></a>
                </div>
            </div>
            <div className="sidebar-menu-content">
                <ul className="nav nav-sidebar-menu sidebar-toggle-view">
                    <li className="nav-item active">
                        <Link to="/dashboard" className="nav-link"><i className="flaticon-menu-1"></i> <span>Dashboard</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/myprojects" className="nav-link"><i className="fa fa-file"></i><span>My Projects</span></Link>
                    </li>
                    {/* More links */}
                </ul>
            </div>
        </div>
    );
};

const Sidebar2  = ({collapsed}) => {
  // const { collapsed } = useSidebar();
  console.log("sidebar2-collapsed",collapsed);
  const [activeTab, setActiveTab] = useState("dashboard");
    return (<>
      {!collapsed&&<aside >
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color " style={{width:collapsed?"16em":"4em"}}>
      <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li onClick={()=> setActiveTab("dashboard")} className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}>
              <Link to="/dashboard" className="nav-link"><i className="fa fa-home"></i></Link>
            </li>
            <li onClick={()=> setActiveTab("myprojects")} className={`nav-item ${activeTab === "myprojects" ? "active" : ""}`}><Link to="/dashboard/myprojects" className="nav-link">
            <i className="fa fa-file"></i></Link></li>
            
            <li onClick={()=> setActiveTab("templates")} className={`nav-item ${activeTab === "templates" ? "active" : ""}`}><Link to="/dashboard/templates" className="nav-link"><i className="fa fa-image"></i></Link></li>
            <li onClick={()=> setActiveTab("resources")} className={`nav-item ${activeTab === "resources" ? "active" : ""}`}><Link to="/dashboard/resources" className="nav-link"><i className="fa fa-object-group"></i></Link></li>
            <li onClick={()=> setActiveTab("drafts")} className={`nav-item ${activeTab === "drafts" ? "active" : ""}`}><Link to="/dashboard/drafts" className="nav-link"><i className="fa fa-edit"></i></Link></li>
          </ul>
  
          <ul className="nav nav-sidebar-menu sidebar-toggle-view border-top mt-100">
            <li onClick={()=> setActiveTab("settings")} className={`nav-item ${activeTab === "settings" ? "active" : ""}`}><Link to="/dashboard/setting" className="nav-link"><i className="fa fa-cog"></i></Link></li>
            <li onClick={()=> setActiveTab("logout")} className={`nav-item ${activeTab === "logout" ? "active" : ""}`}><Link to="/dashboard/logout" className="nav-link"><i className="flaticon-turn-off"></i></Link></li>
          </ul>
        </div>
        
      </div>
      </aside>}
      {collapsed&&<aside>
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
      <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li className="nav-item active">
              <a href="/dashboard" className="nav-link"><i className="fa fa-home"></i> <span>Dashboard</span></a>
            </li>
            <li className="nav-item"><a href="/dashboard/myprojects" className="nav-link"><i className="fa fa-file"></i><span>My Projects</span></a></li>
            {/* <li className="nav-item"><a href="/dashboard/projects-header" className="nav-link"><i className="fa fa-file"></i><span>MY Pro-Header</span></a></li> */}
            <li className="nav-item"><a href="/dashboard/templates" className="nav-link"><i className="fa fa-image"></i><span>Templates</span></a></li>
            <li className="nav-item"><a href="/dashboard/resources" className="nav-link"><i className="fa fa-object-group"></i><span>Resources</span></a></li>
            <li className="nav-item"><a href="/dashboard/drafts" className="nav-link"><i className="fa fa-edit"></i><span>Drafts</span></a></li>
          </ul>
  
          <ul className="nav nav-sidebar-menu sidebar-toggle-view border-top mt-100">
            <li className="nav-item"><a href="/dashboard/setting" className="nav-link"><i className="fa fa-cog"></i><span>Setting</span></a></li>
            <li className="nav-item"><a href="/dashboard/logout" className="nav-link"><i className="flaticon-turn-off"></i><span>Log Out</span></a></li>
          </ul>
        </div>
      </div>
      </aside>}
      </>);
  };
  
 
  


