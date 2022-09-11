import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { helpHttp, backendUrl } from '../helpers/helpHttp';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const api = helpHttp()

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [authError, setAuthError] = useState(false)
    const [bookingError, setBookingError] = useState(false)
    const [lastProductVisited, setLastProductVisited] = useState("")
    const [lastPage, setLastPage] = useState("")
    const [isBtnLoading, setIsBtnLoading] = useState(false)

    const getCurrentUser = () => {
        const storageInfo = JSON.parse(localStorage.getItem('digital-booking')) || {}
        if (storageInfo['digital-token']) {
            setCurrentUser({
                name: storageInfo['digital-name'],
                surname: storageInfo['digital-surname'],
                email: storageInfo['digital-email'],
                token: storageInfo['digital-token'],
                id: storageInfo['digital-id'],
                city: storageInfo['digital-city'],
                role: storageInfo['digital-role'],
            })
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        setLastPage(window.location.pathname)
        if (window.location.pathname.includes("products")) {
            setLastProductVisited(window.location.pathname)
        }
    }, [window.location.pathname])

    const register = async (name, surname, email, password, role = "client") => {
        setIsBtnLoading(true)
        try {
            const response = await api.post(`${backendUrl}/auth/register`, {
                body: {
                    name: name,
                    surname: surname,
                    email: email,
                    password: password,
                    role: role
                },
            })
            if (response.ok) {
                navigate('/checkemail')
            }
            getCurrentUser()
        }
        catch (err) {
            setAuthError(true)
        }

        setIsBtnLoading(false)

    };
    const login = async (email, password) => {
        setIsBtnLoading(true)
        try {
            const response = await api.post(`${backendUrl}/auth/login`, {
                body: {
                    email: email,
                    password: password,
                },
            })
            if (response.status === 403) {
                navigate('/notvalidated')
            }
            const user = await response.json()
            localStorage.setItem('digital-booking',
                JSON.stringify({
                    'digital-token': user.token,
                    'digital-name': user.name,
                    'digital-surname': user.surname,
                    'digital-email': user.email,
                    'digital-id': user.id,
                    'digital-city': user.city,
                    'digital-role': user.role,
                }),
            )

            if (response.ok) {
                navigate(lastProductVisited)
            }
            getCurrentUser()

        }
        catch (err) {
            setAuthError(true)
        }

        setIsBtnLoading(false)
    };
    const logout = async () => {
        localStorage.removeItem('digital-booking');
        setCurrentUser(null)
    };

    const value = {
        register,
        login,
        logout,
        currentUser,
        authError,
        setAuthError,
        bookingError,
        setBookingError,
        setLastProductVisited,
        isBtnLoading,
        lastPage
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);


