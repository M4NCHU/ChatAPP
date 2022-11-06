import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../context/UserContext'
import * as Pages from "../constants/Routes"

const ProtectedRoute = ({children}) => {
    
    const {user} = UserAuth()

    return user ? children : <Navigate to={Pages.LOGIN}/>
    
    
    
    
}

export default ProtectedRoute