import { Container, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import CardBooking from './CardBooking';
import { useGlobalStorage } from '../../store/global';

export default function BookingClient() {
    const fetchBooking = useGlobalStorage(state => state.fetchBooking)
    useEffect(() => {
        fetchBooking()
    }, [fetchBooking])

    return (
        <Container maxW='container.xl' mt={4}>
            <Text fontSize='4xl' fontWeight='bold' >Reservas y viajes</Text>
            <CardBooking />
        </Container >
    )
}
