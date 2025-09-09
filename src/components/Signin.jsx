import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Signin() {
  const { session, signInUser } = UserAuth();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate();

  React.useEffect(() => {
    if (session) {
      navigate('/');
    }
    if (session === undefined) {
      return <div>Loading...</div>;
    }
  }, [session, navigate]);


  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        console.log("User signed in successfully");
        setError(null);
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto p-24" onSubmit={handleSignIn}>
        <h2 className="text-2xl font-bold  text-center">Sign In</h2>
        <div className="flex flex-col">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="p-3 mt-6 border-2" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 mt-6 border-2" />
          <button type="submit" className="mt-6 w-full" disabled={loading}>
            Sign In
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default Signin