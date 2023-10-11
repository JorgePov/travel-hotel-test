import React, { useState } from 'react'
import { Card, Text, Box, Stack, FormControl, FormLabel, Input, Button, Flex, InputLeftAddon, InputGroup, Select } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from '../shared/icons/CustomIcons';
import { useGlobalStorage } from '../../store/global';
import { contactProps } from '../CreatedBooking/CreatedBooking';
import { Travels } from '../../interfaces/User';


export default function ThridStep({ goToNext, goToPrevious }: contactProps) {
    const { setCreateDataBooking, createDataBooking, setShowAlert } = useGlobalStorage()

    const initialPeopleData: Travels[] = Array.from({ length: (createDataBooking.numberTravels! - 1) }, () => ({
        name: "",
        email: "",
        document: "",
        documentType: "",
        phoneNumber: "",
    }));

    const [travels, setTravels] = useState<Travels[]>(createDataBooking.travels || initialPeopleData);


    const handleGoToNext = () => {
        if (validatePeopleData(travels)) {
            setCreateDataBooking({
                ...createDataBooking,
                travels: travels
            })
            goToNext()
        } else {
            setShowAlert({
                isShow: true,
                message: 'Por favor completa todos los campos.',
                status: 'warning'
            })
        }

    }

    const handleChange = (value: string, index: number, field: 'name' | 'email' | 'document' | 'documentType' | 'phoneNumber') => {
        const updatedPeopleData: Travels[] = [...travels];
        updatedPeopleData[index][field] = value;
        setTravels(updatedPeopleData);
    };

    const validatePeopleData = (travelsData: Travels[]): boolean => {
        return travelsData.every((travel) => travel.name && travel.email && travel.document && travel.documentType && travel.phoneNumber);
    }

    return (
        <>
            <Flex justifyContent={'center'}>
                <Card variant={'elevated'} my={4} w={'65%'} >
                    <Box p={5}>
                        <Text fontSize={'4xl'} textAlign={'center'} fontWeight={'medium'} mb={3}> Informacion de Acompañantes</Text>
                        <Stack spacing={2}>
                            {travels.map((person, index) => (
                                <Stack p={4} borderWidth="1px" borderRadius="md" key={'travel' + index} spacing={1}>
                                    <Text fontSize={'md'} fontWeight={'medium'} mb={3}>Acompañante {createDataBooking.numberTravels! > 2 ? <>{index + 1}</> : null} </Text>
                                    <FormControl>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <Input
                                            placeholder="Nombre completo"
                                            value={person.name}
                                            onChange={(e) => handleChange(e.target.value, index, 'name')}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <Input
                                            name='email'
                                            placeholder="Correo electrónico"
                                            value={person.email}
                                            onChange={(e) => handleChange(e.target.value, index, 'email')}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Tipo de Documento</FormLabel>
                                        <Select name='documentType' placeholder="Seleccionar tipo de documento" value={person.documentType}
                                            onChange={(e) => handleChange(e.target.value, index, 'documentType')}

                                        >
                                            <option value="CC">Cédula de Ciudadanía</option>
                                            <option value="DE">Documento de Extranjería</option>
                                            <option value="PA">Pasaporte</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Documento</FormLabel>
                                        <Input placeholder="Documento" type="number" min={0} value={person.document}
                                            onChange={(e) => handleChange(e.target.value, index, 'document')} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'medium'}>Telefono</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='+57' />
                                            <Input name='phoneNumber' type="number" min={0} placeholder="1111111111" value={person.phoneNumber}
                                                onChange={(e) => handleChange(e.target.value, index, 'phoneNumber')} />
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>
                </Card >
            </Flex >
            <Flex justifyContent={'space-around'}>
                <Button colorScheme='blue' onClick={goToPrevious}>
                    <ArrowLeft width={24} height={24} fill='white' />
                    Regresar
                </Button>
                <Button colorScheme='blue' onClick={handleGoToNext} isDisabled={!validatePeopleData(travels)}>
                    Continuar
                    <ArrowRight width={24} height={24} fill='white' />
                </Button>
            </Flex>
        </>
    )
}
