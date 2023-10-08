import React, { FormEvent, useState } from 'react';
import { loginData } from '../../interfaces/User';
import {
    Box,
    Button,
    Card,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
} from '@chakra-ui/react';
import { loginUser } from '../../services/userService';
import { useGlobalStorage } from '../../store/global';

export default function Login() {
    const setUser = useGlobalStorage(state => state.setUserInfo)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;




        const credential: loginData = {
            email,
            password
        }
        setIsLoading(true)
        console.log(credential)
        await loginUser(credential).then(response => {
            setUser(response, true)
        }).catch(error => {
            alert(error)
        })
        setIsLoading(false)
        form.reset()
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            backgroundColor="gray"
        >
            <Card padding="4" boxShadow="md" borderRadius="md" bg="primary.200">
                <Heading as="h2" size="lg" textAlign="center" mb="4">
                    Iniciar sesión
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing="4">
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input name="email" type="email" placeholder="travel01@example.com" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <Input name="password" type="password" placeholder="121212" />
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

