import React, { createContext, useContext, useState, ReactNode } from 'react';

export function AuthProvider() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated
    }

}
