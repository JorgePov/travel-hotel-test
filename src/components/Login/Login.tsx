import React, { FormEvent, useState } from 'react';
import { User, loginData } from '../../interfaces/User';
import {
    Box,
    Button,
    Card,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
} from '@chakra-ui/react';
import { loginUser } from '../../services/userService';
import { useGlobalStorage } from '../../store/global';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { setUserInfo, setShowAlert, isAdmin } = useGlobalStorage()
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => {
        navigate('/register')
    }

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
        await loginUser(credential).then((response) => {
            setIsLoading(false)
            setUserInfo(response, true)
            if (isAdmin) {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }
        }).catch(error => {
            setIsLoading(false)
            setShowAlert({
                status: 'error',
                message: error.message,
                isShow: true
            })
            form.reset()
        })

    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bg={"grey"}
        >
            <Card padding="4" boxShadow="md" borderRadius="md" bg="primary.200" color={'fontColor.white'}>
                <Heading as="h2" size="lg" textAlign="center" mb="4" >
                    Iniciar sesión
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing="4">
                        <FormControl id="email" isRequired>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input name="email" type="email" placeholder="travel01@example.com" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <Input name="password" type="password" placeholder="121212" />
                        </FormControl>

                        {isLoading ? (
                            <Button
                                colorScheme="blue"
                                size="lg"
                                fontSize="md"
                                mt={4}
                                disabled={true}
                            >
                                <Spinner />
                            </Button>
                        ) : <Button type="submit" colorScheme="blue" size="lg" width="100%">
                            Iniciar sesión
                        </Button>}

                        {isLoading ? (
                            <Button
                                colorScheme="teal"
                                size="lg"
                                fontSize="md"
                                mt={4}
                                disabled={true}
                            >
                                <Spinner />
                            </Button>
                        ) : <Button
                            type="button"
                            colorScheme="teal"
                            size="lg"
                            width="100%"
                            onClick={handleClick}
                        >
                            Registrarse
                        </Button>}


                    </Stack>
                </form>
            </Card>
        </Box>

    );
};

