import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

function Nav() {
  const { session, signOutUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    navigate('/');
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-center mt-8">
        React Supabase<br />Authentication
      </h3>
      <nav className="flex justify-center gap-4 my-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        { session ? (
          <>
            <Link  className="text-blue-500 hover:underline" onClick={handleSignOut}>
              Sign Out
            </Link>
            <small className="text-gray-500">
              Logged in as: {session.user.email}
            </small>
          </>
        ) : (
          <>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Nav;
