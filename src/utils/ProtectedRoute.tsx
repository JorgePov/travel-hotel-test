import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useGlobalStorage } from '../store/global';

type ProtectedRouteProps = RouteProps & {
    redirectTo?: string;
    canActived?: boolean
};

export function ProtectedRoute({ redirectTo = '/login', canActived }: ProtectedRouteProps) {

    if (!canActived) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}

export function ProtectedRouteAdmin({ redirectTo = '/login' }: ProtectedRouteProps) {
    const { isAdmin } = useGlobalStorage()

    if (!isAdmin) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}
