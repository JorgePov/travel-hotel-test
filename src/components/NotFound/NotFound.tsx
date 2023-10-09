import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    }

    return (
        <Flex align="center" justify="center" flexDirection={"column"} h="100vh" lineHeight='tall'>
            <Text fontSize='4xl' mb={4}>404 - Página no encontrada</Text>
            <Button
                type="button"
                bg="primary.200"
                color='white'
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