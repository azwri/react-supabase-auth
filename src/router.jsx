import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App (with Nav) is always rendered
        children: [
            {
                index: true,
                element: <PrivateRoute>{/* Home or dashboard component here */}</PrivateRoute>,
            },
            {
                path: 'signin',
                element: <Signin />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            // Add other protected or public routes here
        ],
    },
]);

export default router;
