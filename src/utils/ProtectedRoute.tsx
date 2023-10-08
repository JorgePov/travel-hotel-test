import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & {
    redirectTo?: string;
    canActived: boolean
};

export function ProtectedRoute({ redirectTo = '/login', canActived }: ProtectedRouteProps) {

    if (!canActived) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}
