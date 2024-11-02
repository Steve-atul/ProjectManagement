import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import { Sidebar } from "./components/sidebar/Sidebar";
import Analytics from "./pages/analytics/Analytics";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Settings from "./pages/settings/Settings";
import PublicSharedTask from "./pages/publicSharedTask/PublicSharedTask";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);

  const HomeLayout = () => {
    return (
      <div className="App">
        <Outlet />
      </div>
    );
  };

  const DashboardLayout = () => {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            position: "fixed",
            top: 0,
            backgroundColor: "white",
          }}
        >
          <Sidebar />
        </div>
        <div style={{ flex: 5, marginLeft: "15rem", overflow: "hidden" }}>
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: !currentUser ? (
            <Auth />
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: 1,
                    position: "fixed",
                    top: 0,
                    backgroundColor: "white",
                  }}
                >
                  <Sidebar />
                </div>
                <div
                  style={{ flex: 5, marginLeft: "15rem", overflow: "hidden" }}
                >
                  <Dashboard />
                </div>
              </div>
            </>
          ),
        },
       
      ],
    },
    {
      path: "/dashboard",
      element: currentUser ? <DashboardLayout /> : <HomeLayout />,
      children: [
        {
          path: "/dashboard/",
          element: currentUser ? <Dashboard /> : <Auth />,
        },
        {
          path: "/dashboard/analytics",
          element: currentUser ? <Analytics /> : <Auth />,
        },
        {
          path: "/dashboard/settings",
          element: currentUser ? <Settings /> : <Auth />,
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
    {
      path: "/share/:taskId",
      element: <PublicSharedTask />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
