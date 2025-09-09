import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App (with Nav) is always rendered
        children: [
            {
                index: true,
                element: <PrivateRoute></PrivateRoute>,
            },
            {
                path: 'signin',
                element: <Signin />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
            },
        ],
    },
]);

export default router;
