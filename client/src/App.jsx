import {RouterProvider} from "react-router";
import {router} from "./app.routes.jsx";
import {AuthProvider} from "./components/context/AuthContext.jsx";



export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
