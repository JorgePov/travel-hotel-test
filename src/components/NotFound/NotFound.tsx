import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../../utils/AuthContext";

export default function NotFound() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Verificar la autenticación y redirigir según sea necesario
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>404 - Página no encontrada</h1>
        </div>
    );
}