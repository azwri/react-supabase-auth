import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { session } = UserAuth();

  if( session === undefined ) {
    return <div>Loading...</div>
  }
    return session ? children : <Navigate to="/signin" />
}

export default PrivateRoute