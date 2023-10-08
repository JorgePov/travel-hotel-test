import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, Center, FormControl, FormLabel, Input, Stack, Select, Grid, GridItem, useBreakpointValue, InputGroup, InputLeftAddon, InputRightElement, Spinner, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStorage } from '../../store/global';
import { User } from '../../interfaces/User';
import { createdUser } from '../../services/userService';
export default function Register() {
    const { setShowAlert, setUserInfo } = useGlobalStorage()
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login')
    }

    const isMobile = useBreakpointValue({ base: true, md: false });

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const [show, setShow] = useState(false)
    const handleClickShow = () => setShow(!show)

    const [showConfirm, setShowConfirm] = useState(false)
    const handleClickShowConfirm = () => setShowConfirm(!showConfirm)

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const validateForm = (password: string, confirmPassword: string) => {
        const isPasswordValid = password.length >= 6;
        const passwordsMatch = password === confirmPassword;
        if (isPasswordValid && passwordsMatch) {
            setIsFormValid(isPasswordValid && passwordsMatch);
        } else {
            if (!isPasswordValid) setShowAlert({
                isShow: true,
                message: 'contraseñas debe ser mayor a 6 caracteres',
                status: 'warning'
            })

            if (!passwordsMatch) setShowAlert({
                isShow: true,
                message: 'contraseñas no coinciden',
                status: 'warning'
            })
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)

        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const name = formData.get('name') as string;
        const lastName = formData.get('lastName') as string;
        const document = formData.get('document') as string;
        const documentType = formData.get('documentType') as string;
        const phoneNumber = formData.get('phoneNumber') as string;
        const genre = formData.get('genre') as string;

        validateForm(password, confirmPassword)

        const newUserData: User = {
            email,
            password,
            name,
            lastName,
            document,
            documentType,
            phoneNumber,
            genre,
            type: 'travel'
        }

        if (isFormValid) {
            await createdUser(newUserData).then((response) => {
                setUserInfo(response, true)
                setShowAlert({
                    isShow: true,
                    message: 'registro exitoso',
                    status: 'success'
                })
                setIsLoading(false)
                navigate('/dashboard')
            }).catch(error => {
                setShowAlert({
                    status: 'error',
                    message: error.message,
                    isShow: true
                })
                setIsLoading(false)
            })
        }
        setIsLoading(false)
    };

    return (
        <Center minH="100vh" bg='whiteAlpha.500'>
            <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" width="100%" margin="20px" bg='primary.200'>
                <form onSubmit={handleSubmit}>
                    <Grid templateColumns={isMobile ? '1fr' : '1fr 1fr'} gap={4}>
                        <GridItem colSpan={isMobile ? 1 : 1}>
                            <Stack spacing={4}>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input name='name' type="text" />
                                </FormControl>

                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Apellido</FormLabel>
                                    <Input name='lastName' type="text" />
                                </FormControl>

                                <FormControl id="document" isRequired>
                                    <FormLabel>Documento</FormLabel>
                                    <Input name='document' type="text" />
                                </FormControl>

                                <FormControl id="documentType" isRequired>
                                    <FormLabel>Tipo de Documento</FormLabel>
                                    <Select name='documentType' placeholder="Seleccionar tipo de documento">
                                        <option value="CC">Cédula de Ciudadanía</option>
                                        <option value="DE">Documento de Extranjería</option>
                                        <option value="PA">Pasaporte</option>
                                    </Select>
                                </FormControl>

                                <FormControl id="phoneNumber" isRequired>
                                    <FormLabel>Teléfono</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='+57' />
                                        <Input name='phoneNumber' type='tel' placeholder='phone number' />
                                    </InputGroup>
                                </FormControl>

                            </Stack>
                        </GridItem>

                        <GridItem colSpan={isMobile ? 1 : 1}>
                            <Stack spacing={4}>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input name='email' type="email" />
                                </FormControl>

                                <FormControl id="genre" isRequired>
                                    <FormLabel>Género</FormLabel>
                                    <Select name='genre' placeholder="Seleccionar genero">
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                    </Select>
                                </FormControl>

                                <FormControl id="password" isRequired>
                                    <FormLabel>Contraseña</FormLabel>

                                    <InputGroup size='md'>
                                        <Input
                                            name='password'
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            onChange={handlePasswordChange}
                                            value={password}
                                            placeholder='Enter password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickShow}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="confirmPassword" isRequired>
                                    <FormLabel>Confirmar Contraseña</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            name='confirmPassword'
                                            pr='4.5rem'
                                            type={showConfirm ? 'text' : 'password'}
                                            onChange={handleConfirmPasswordChange}
                                            value={confirmPassword}
                                            placeholder='Enter password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClickShowConfirm}>
                                                {showConfirm ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </GridItem>
                    </Grid>
                    <Flex justify='center' gap='0.625rem'>
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
                        ) : <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            fontSize="md"
                            mt={4}
                        >
                            Registrarse
                        </Button>}
                        {isLoading ? (
                            <Button
                                colorScheme="teal" size="lg"
                                fontSize="md"
                                mt={4}
                                disabled={true}
                            >
                                <Spinner />
                            </Button>
                        ) : <Button type="button" colorScheme="teal" size="lg"
                            fontSize="md"
                            mt={4} onClick={handleClick}>
                            Ir a Iniciar Sesión
                        </Button>
                        }

                    </Flex>





                </form>
            </Box>


        </Center>
    );
};


