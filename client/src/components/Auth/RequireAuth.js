import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const location = useLocation()

  return (
    user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />
  )
}
