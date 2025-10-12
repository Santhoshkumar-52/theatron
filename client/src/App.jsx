import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dasboard";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RouterLayout from "./RouterLayout/RouterLayout";
import ProtectedRoute from "./RouterLayout/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RouterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
