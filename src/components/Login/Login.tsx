import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
} from '@chakra-ui/react';

interface LoginProps {
    onSubmit: (email: string, password: string) => void;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simular una solicitud de inicio de sesión (aquí puedes usar Axios, fetch, etc.)
        setTimeout(() => {
            //onSubmit(email, password);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            backgroundColor="gray"
        >
            <Card padding="4" boxShadow="md" borderRadius="md" bg="primary.150">
                <Heading as="h2" size="lg" textAlign="center" mb="4">
                    Iniciar sesión
                </Heading>
                <form>
                    <Stack spacing="4">
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="travel01@example.com" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <Input type="password" placeholder="********" />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" size="lg" width="100%">
                            Iniciar sesión
                        </Button>
                        <Button
                            type="button"
                            colorScheme="teal"
                            size="lg"
                            width="100%"
                            onClick={() => {
                                // Aquí puedes manejar la redirección o mostrar el formulario de registro
                                console.log('Redirigir a la página de registro o mostrar el formulario de registro');
                            }}
                        >
                            Registrarse
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Box>

    );
};

