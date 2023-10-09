import { Container, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useGlobalStorage } from '../../store/global';
import CardBooking from '../BookingClient/CardBooking';

export default function BookingAdmin() {
    const fetchBookingAdmin = useGlobalStorage(state => state.fetchBookingAdmin)
    useEffect(() => {
        fetchBookingAdmin()
    }, [fetchBookingAdmin])

    return (
        <Container maxW='container.xl' mt={4}>
            <Text fontSize='4xl' fontWeight='bold' >Lista de reservas</Text>
            <CardBooking />
        </Container >
    )
}
