import { Container, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useGlobalStorage } from '../../store/global';
import CardBooking from '../BookingClient/CardBooking';

export default function BookingAdmin() {
    const { fetchBookingAdmin, isLoading } = useGlobalStorage()
    useEffect(() => {
        fetchBookingAdmin()
    }, [fetchBookingAdmin])

    return (

        <>
            {
                !isLoading ?
                    <Flex m={5} justifyContent={'center'}>
                        < Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex>
                    :
                    <Container maxW='container.xl' mt={4}>
                        <Text fontSize='4xl' fontWeight='bold' >Lista de reservas</Text>
                        <CardBooking />
                    </Container >
            }
        </>
    )
}
