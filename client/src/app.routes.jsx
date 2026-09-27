import {createBrowserRouter} from "react-router";
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPannel from "./pages/admin/ProductManagementPage.jsx";
import LoginPage from "./pages/LoginPage";
import {Protected} from "./components/admin/Protected.jsx";
import AdminControlPage from "./pages/admin/AdminControlPage.jsx";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage/>
    },
    {
        path:"/products/:id",
        element:<ProductPage />
    },
    {
        path:"/login",
        element:<LoginPage />
    },
    {
        path:"/staff",
        element:<Protected><AdminPannel/></Protected>
    },
    {
        path:"/admin/control",
        element:<Protected><AdminControlPage/></Protected>
    },
    {
        path:"*",
        element:<NotFoundPage/>
    }
]);