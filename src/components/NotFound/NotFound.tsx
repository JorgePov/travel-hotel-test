import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    }

    return (
        <Flex align="center" justify="center" flexDirection={"column"} h="100vh">
            <h1>404 - Página no encontrada</h1>
            <Button
                type="button"
                colorScheme="teal"
                size="lg"
                alignContent="center"
                width="50%"
                onClick={handleClick}
            >
                Iniciar sesión
            </Button>
        </Flex>
    );
}