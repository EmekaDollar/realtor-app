import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus()
    if (checkingStatus) {
        return <h3>Loading...</h3>
    }
    // if it is true, go to profile using Outlet else redirect to the sign in page. 
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

// Outlet allows nexted routes to render their element. The element in this case is: PrivateRoute.
// So you have to go to PrivateRoute before you go to profile. 
// PrivateRoute determins if you go to the Profile page or the sign-in page.
// Outlet is used for checking if a user is signed in without passing props. 
// if outlet is true, PrivateRoute will run and if the user is loggedIn outlet will render the Profile page