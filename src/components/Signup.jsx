import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Signup() {
  const { session, signUpNewUser } = UserAuth();
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        console.log("User signed up successfully");
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
      <form className="max-w-md mx-auto p-24" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold  text-center">Sign Up</h2>
        <div className="flex flex-col">
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="p-3 mt-6 border-2" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="p-3 mt-6 border-2" />
          <button type="submit" className="mt-6 w-full" disabled={loading}>
            Create Account
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  )
}

export default Signup