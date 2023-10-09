import { Container, Text, Box, Button, } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import CardBooking from './CardBooking';
import { createBooking, getBookingById } from '../../services/bookingService';
import { useGlobalStorage } from '../../store/global';

export default function BookingClient() {
    const userInfo = useGlobalStorage(state => state.userInfo)
    const id = userInfo!.id || 'ads'


    const handlerClick = async () => {
        console.log('cargar bookings');
        //getBookingById(id).then(r => console.log(r))
        const res = await getBookingById('Qgcko2heyq2Ba26Qeq3Y')
        console.log(res);

        /* {
        idHotel: "MVQg6dJKZKe4mTgO3y5U",
        idRoom: "23ZHXSbRV7tVzcUaCzP3",
        idUser: "Qgcko2heyq2Ba26Qeq3Y",
    } */
    }

    return (
        <Container maxW='container.xl' mt={4}>
            <Text fontSize='4xl' fontWeight='bold' >Reservas y viajes</Text>
            <Box mb={5}>
                <Text fontSize='2xl' fontWeight='bold' >Girardot</Text>
                <Text fontSize='sm'  >4 Jul – 6 Jul</Text>
            </Box>
            <Button onClick={handlerClick}>
                dasds
            </Button>
        </Container >
    )
}
