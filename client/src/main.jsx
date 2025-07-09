import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout.jsx";
import "./App.css";
import AdminPath from "./login/admin.jsx";
import Publicroutes from "./login/routes.jsx";
import ProtectedPath from "./login/protected.path.jsx";
import About from "./pages/about.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Signbutton from "./comp/signbutton.jsx";
import Login from "./login/loginup.jsx";
import LoginPopup from "./login/signup.jsx";
import Main from "./pages/home.jsx";
import VerifyPage from "./pages/verify.jsx";
import Admin from "./pages/admin/admin.jsx";
import Docs from "./pages/docs.jsx";
import Project from "./pages/project.jsx";
import Success from "./login/success.jsx";
import Profile from "./pages/profile.jsx";
import NotFound from "./pages/notfoundpage.jsx";
import Testo from "./pages/example.jsx";
function App() {
  const router = createBrowserRouter([
    {
       path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Publicroutes>
            <Main />
          </Publicroutes>
        ),
      },{
        path: "notfound",
        element: (
          <Publicroutes>
            <NotFound />
          </Publicroutes>
        ),
      },
      {
  path: "success",
  element: (
    <Publicroutes>
      <Success />
    </Publicroutes>
  ),
},
      
      {
        path: "projects",
        element: (
          <Publicroutes>
            <Project />
          </Publicroutes>
        ),
      },
      
      {
        path: "docs",
        element: (
          <Publicroutes>
            <Docs />
          </Publicroutes>
        ),
      },
      {
        path: "about",
        element: (
          <Publicroutes>
            <About />
          </Publicroutes>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminPath>
            <Admin />
          </AdminPath>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedPath>
            <Profile />
          </ProtectedPath>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedPath>
            <Dashboard />
          </ProtectedPath>
        ),
      },
      {
        path: "verify/:token",
        element: <VerifyPage />,
      },
      
      {
  path: "success",
  element: (
    <Publicroutes>
      <Success />
    </Publicroutes>
  ),
},
      {
        path: "test",
        element: (
          <Publicroutes>
            <Testo/>
          </Publicroutes>
        ),
      },
      {
        path: "login",
        element: (
          <Publicroutes>
            <Login />
          </Publicroutes>
        ),
      },
      {
        path: "sign",
        element: (
          <Publicroutes>
            <LoginPopup />
          </Publicroutes>
        ),
      },
    ],
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(<App />);
