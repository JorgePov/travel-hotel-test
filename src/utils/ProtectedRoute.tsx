import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthContext';

type ProtectedRouteProps = RouteProps & {
    redirectTo?: string;
};

export function ProtectedRoute({ redirectTo = '/login', }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}
