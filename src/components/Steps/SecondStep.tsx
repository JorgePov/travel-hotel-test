import { Card, Text, Box, Stack, FormControl, FormLabel, Input, Button, Flex, InputLeftAddon, InputGroup } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from '../shared/icons/CustomIcons';
import { useGlobalStorage } from '../../store/global';
import { contactProps } from '../CreatedBooking/CreatedBooking';

const SecondStep = ({ goToNext, goToPrevious }: contactProps) => {
    const { setCreateDataBooking, createDataBooking } = useGlobalStorage()
    const [name, setName] = useState<string>(createDataBooking.emergencyContact?.name || '')
    const [phoneNumber, setPhoneNumber] = useState<string>(createDataBooking.emergencyContact?.phoneNumber || '')

    const handleGoToNext = () => {
        setCreateDataBooking({
            ...createDataBooking, emergencyContact: {
                name, phoneNumber
            }
        })
        goToNext()
    }

    return (
        <>
            <Flex justifyContent={'center'}>
                <Card variant={'elevated'} my={4} w={'65%'} >
                    <form>
                        <Box p={5}>
                            <Text fontSize={'4xl'} textAlign={'center'} fontWeight={'medium'} mb={3}> Contacto de emergencia</Text>
                            <Stack spacing={2}>
                                <FormControl id="name" isRequired>
                                    <FormLabel fontWeight={'medium'}>Nombre Completo</FormLabel>
                                    <Input name='name' type="text" value={name} onChange={(event) => setName(event.target.value)} />
                                </FormControl>
                                <FormControl id="phoneNumber" isRequired>
                                    <FormLabel fontWeight={'medium'}>Telefono</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='+57' />
                                        <Input name='phoneNumber' type="number" min={0} value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </Box>
                    </form>
                </Card >
            </Flex>
            <Flex justifyContent={'space-around'}>
                <Button colorScheme='blue' onClick={goToPrevious}>
                    <ArrowLeft width={24} height={24} fill='white' />
                    Regresar
                </Button>
                <Button colorScheme='blue' onClick={handleGoToNext} isDisabled={name === '' || phoneNumber === ''}>
                    Continuar
                    <ArrowRight width={24} height={24} fill='white' />
                </Button>
            </Flex>
        </>
    )
}


export default SecondStep;