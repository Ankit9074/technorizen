import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import RoleSelection from "./pages/auth/RoleSelection";
import DashboardLanding from "./pages/innerpages/DashboardLanding";
import { PrivateRoute } from "../src/components/auth/PrivateRoute";
import { PublicRoute } from "../src/components/auth/PublicRoute";
import { Toaster } from "@/components/ui/sonner";
import { Verify } from "./pages/auth/Verify";
import { SetupProfile } from "./pages/auth/SetupProfile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Login from "./pages/auth/Login";
import MyProjects from "./pages/innerpages/MyProjects";
import MyTemplates from "./pages/innerpages/MyTemplates";
import Drafts from "./pages/innerpages/Drafts";
import { SidebarProvider } from "./context/SidebarContext";
import DashboardEditor from "./pages/innerpages/DashboardEditor";
import Dashboard from "./pages/innerpages/DashboardEditor1";
import { Transform } from "./components/Dashboard/components/signup/Transform";
import { DashboardLayout } from "./components/Dashboard/layout/DashboardLayout";
import DashboardBuilder from "./pages/innerpages/DashboardEditor";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          {/* <Route element={<PublicRoute />}> */}
          <Route path="/" element={<Transform />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signup/verify-otp" element={<Verify />} />
          <Route path="/profile-setup" element={<SetupProfile />} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          {/* </Route> */}

          {/* Dashboard layout and private routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardLanding />} />
            <Route path="/dashboard/myprojects" element={<MyProjects />} />
            <Route path="/dashboard/templates" element={<MyTemplates />} />
            <Route path="/dashboard/drafts" element={<Drafts />} />
          </Route>
          <Route path="/dashboard/projects/1/editor" element={<DashboardBuilder />} />
          {/* <Route path="/projects/:projectId" element={<Index />} /> */}
          {/* </Route> */}
        </Routes>
        <Toaster />
      </Router>
    </SidebarProvider>
  );
}

export default App;
