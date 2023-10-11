import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import CardBooking from './CardBooking';
import { useGlobalStorage } from '../../store/global';

export default function BookingClient() {
    const { fetchBooking, isLoading } = useGlobalStorage()
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    return (
        <>
            {
                isLoading ?
                    <Flex m={5} justifyContent={'center'}>
                        < Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex> :
                    <Container maxW='container.xl' mt={4}>
                        <Text fontSize={{ base: '2xl', sm: '4xl' }} fontWeight='bold' >Reservas y viajes</Text>
                        <CardBooking />
                    </Container >
            }
        </>
    )
}
