import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  FileDown,
  Lock,
  FileText,
  Database,
  User,
  UserCircle2,
  PanelLeftCloseIcon,
  MenuIcon,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResolutionSelector } from "./ResolutionSelector";
import { TemplateSelector } from "./TemplateSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import logo from "../../../assets/imgs/logo.png";
import logo_blackfont from "../../../assets/imgs/logo_blackfont.png";
import adminImg from "../../../assets/imgs/figure/admin.jpg";
import { useSidebar } from "../../../context/SidebarContext";
import { IconBellFilled } from "@tabler/icons-react";
export const DashboardHeader = ({}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);

        localStorage.setItem("user_id", user.id);
        localStorage.setItem("session_start", new Date().toISOString());

        const { data: userData, error } = await supabase
          .from("users")
          .select("role, other_role_description")
          .eq("id", user.id)
          .single();

        if (!error && userData) {
          setUserRole(
            userData.role === "Other" && userData.other_role_description
              ? `Other - ${userData.other_role_description}`
              : userData.role
          );
        }
      }
    };
    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    // Retrieve user ID and session start time from local storage
    const userId = localStorage.getItem("user_id");
    const sessionStart = localStorage.getItem("session_start");

    if (userId && sessionStart) {
      const sessionEndTime: any = new Date();
      const sessionStartTime: any = new Date(sessionStart);
      const sessionDuration = sessionEndTime - sessionStartTime;

      // Update session_end and session_duration in the users table
      const { error } = await (supabase as any)
        .from("users")
        .update({
          session_end: sessionEndTime.toISOString(),
          session_duration: `${sessionDuration} milliseconds`,
        })
        .eq("id", userId);

      if (error) {
        console.error("Error updating session end time:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update session details. Please try again.",
        });
      }
    }

    localStorage.removeItem("user_id");
    localStorage.removeItem("alignify_auth_data");
    localStorage.removeItem("session_start");

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
      navigate("/auth/signin");
    }
  };

  const handleExportOption = (type: string) => {
    toast({
      title: "Feature coming soon",
      description: `Export to ${type} will be available in a future update.`,
    });
  };

  return (
    <>
      {/* <div> */}
      <div className="mybody">
        <Header2 />
      </div>
      {/* </div> */}
    </>
  );
};

export const Header2 = () => {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="navbar navbar-expand-md header-menu-one bg-light">
      <div className="nav-bar-header-one px-6">
        <div className="header-logo flex justify-between gap-2 items-center">
          <button className="-order-5 text-6xl text-black" onClick={toggleSidebar}>
          <img src={logo_blackfont} alt="logo" />
          </button>
        </div>
      </div>
      <div className="header-main-menu navbar-collapse" id="mobile-navbar">
        <ul className="navbar-nav">
          <li className="navbar-item header-search-bar">
            <div className="input-group stylish-input-group">
              <span className="input-group-addon">
                <button type="submit">
                  <Search/>
                </button>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="navbar-item header-admin">
            <a href="#" style={{ color: "#000" }}>
              <IconBellFilled/>
            </a>
          </li>
          <li className="navbar-item dropdown header-admin">
            <a
              className="navbar-nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="admin-img mr-3">
                <User />
              </div>
              <div className="admin-title">
                <h5 className="item-title">Riyansh M</h5>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="item-content">
                <ul className="settings-list">
                  <li>
                    <a href="#">
                      <i className="flaticon-user"></i>My Profile
                    </a>
                  </li>

                  <li>
                    <a href="login.html">
                      <i className="flaticon-turn-off"></i>Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

// export const HeaderMenu = () => {
//   return (
//     <div className="navbar navbar-expand-md header-menu-one bg-light">
//       <div className="nav-bar-header-one">
//         <div className="header-logo">
//           <a href="index.html">
//             <img src={logo} alt="logo" />
//           </a>
//         </div>
//         <div className="toggle-button sidebar-toggle">
//           <button type="button" className="item-link">
//             <span className="btn-icon-wrap">
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//           </button>
//         </div>
//       </div>

//       <div className="d-md-none mobile-nav-bar">
//         <button
//           className="navbar-toggler pulse-animation"
//           type="button"
//           data-toggle="collapse"
//           data-target="#mobile-navbar"
//           aria-expanded="false"
//         >
//           <i className="far fa-arrow-alt-circle-down"></i>
//         </button>
//         <button type="button" className="navbar-toggler sidebar-toggle-mobile">
//           <i className="fas fa-bars"></i>
//         </button>
//       </div>

//       <div
//         className="header-main-menu collapse navbar-collapse"
//         id="mobile-navbar"
//       >
//         <ul className="navbar-nav">
//           <li className="navbar-item header-search-bar">
//             <div className="input-group stylish-input-group">
//               <span className="input-group-addon">
//                 <button type="submit">
//                   <span className="flaticon-search" aria-hidden="true"></span>
//                 </button>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search"
//               />
//             </div>
//           </li>
//         </ul>

//         <ul className="navbar-nav">
//           <li className="navbar-item header-admin">
//             <a href="#" style={{ color: "#000" }}>
//               <i className="fa fa-bell"></i>
//             </a>
//           </li>

//           <li className="navbar-item dropdown header-admin">
//             <a
//               className="navbar-nav-link dropdown-toggle"
//               href="#"
//               role="button"
//               data-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <div className="admin-img mr-3">
//                 <img src={adminImg} alt="Admin" />
//               </div>
//               <div className="admin-title">
//                 <h5 className="item-title">John Doe</h5>
//               </div>
//             </a>

//             <div className="dropdown-menu dropdown-menu-right">
//               <div className="item-content">
//                 <ul className="settings-list">
//                   <li>
//                     <a href="#">
//                       <i className="flaticon-user"></i> My Profile
//                     </a>
//                   </li>
//                   <li>
//                     <a href="login.html">
//                       <i className="flaticon-turn-off"></i> Log Out
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };


// const Header1 = () => {
//   return (
//     <div className="mybody navbar navbar-expand-md header-menu-one bg-light">
//       <div className="nav-bar-header-one">
//         <div className="header-logo">
//           <a href="index.html">
//             <img src={logo_blackfont} alt="logo" />
//           </a>
//         </div>
//         <div className="toggle-button sidebar-toggle">
//           <button type="button" className="item-link">
//             <span className="btn-icon-wrap">
//               <span></span>
//               <span></span>
//               <span></span>
//             </span>
//           </button>
//         </div>
//       </div>
//       {/* Mobile and other components */}
//     </div>
//   );
// };



// export const Header3 = () => {
//   return (
//     <>
//       <div className="">
//         <div className="navbar navbar-expand-md header-menu-one bg-light d-flex">
//           {/* Logo section */}
//           <div className="nav-bar-header-one d-flex align-items-center">
//             <div className="header-logo">
//               <a href="#">
//                 <img src={logo_blackfont} alt="logo" />
//               </a>
//             </div>
//             <div className="toggle-button sidebar-toggle">
//               <button type="button" className="item-link">
//                 <span className="btn-icon-wrap">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Right + center content */}
//           <div
//             className="header-main-menu collapse navbar-collapse justify-content-between"
//             id="mobile-navbar"
//           >
//             <ul className="navbar-nav">
//               <li className="navbar-item header-search-bar">
//                 <div className="input-group stylish-input-group">
//                   <span className="input-group-addon">
//                     <button type="submit">
//                       <span
//                         className="flaticon-search"
//                         aria-hidden="true"
//                       ></span>
//                     </button>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search"
//                   />
//                 </div>
//               </li>
//             </ul>
//             <ul className="navbar-nav ml-auto d-flex align-items-center">
//               <li className="navbar-item header-admin">
//                 <a href="#" style={{ color: "#000" }}>
//                   <i className="fa fa-bell"></i>
//                 </a>
//               </li>
//               <li className="navbar-item dropdown header-admin">
//                 <a
//                   className="navbar-nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <div className="admin-img mr-3">
//                     <img src="img/figure/admin.jpg" alt="Admin" />
//                   </div>
//                   <div className="admin-title">
//                     <h5 className="item-title">John Doe</h5>
//                   </div>
//                 </a>
//                 <div className="dropdown-menu dropdown-menu-right">
//                   <div className="item-content">
//                     <ul className="settings-list">
//                       <li>
//                         <a href="#">
//                           <i className="flaticon-user"></i>My Profile
//                         </a>
//                       </li>
//                       <li>
//                         <a href="login.html">
//                           <i className="flaticon-turn-off"></i>Log Out
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
