/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Spinner, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { deletedBooking, getBookings } from '../../services/bookingService';
import { deletedRoom, getRooms } from '../../services/roomService';
import { deletedHotel, getHotels } from '../../services/hotelService';

interface DeleteAlerts {
    idElement: String;
    type: "booking" | "room" | "hotel"
}

export default function DeleteAlert({ idElement, type }: DeleteAlerts) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const deleteBooking = async () => {
        console.log(idElement)
        await deletedBooking(idElement)
        await getBookings()
        onClose()
    }
    const deleteRoom = async () => {
        await deletedRoom(idElement)
        await getRooms()
        onClose()
    }
    const deleteHotel = async () => {
        await deletedHotel(idElement)
        await getHotels()
        onClose()
    }

    const handlerRequest = {
        booking: deleteBooking,
        room: deleteRoom,
        hotel: deleteHotel
    }

    const handlerClick = async () => {
        setIsLoading(true)
        handlerRequest[type]
        setIsLoading(false)
    }

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>
                {type === 'booking' ? 'Cancelar' : 'Eliminar'}
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {type === 'booking' ? 'Cancelar reserva' : `Eliminar ${type === 'room' ? 'habitacion' : 'hotel'}`}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Estas seguro? No se podra revertir esta accion
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            {isLoading ? (
                                <Button
                                    colorScheme='red'
                                    disabled={true}
                                >
                                    <Spinner />
                                </Button>
                            ) : <Button colorScheme='red' onClick={handlerClick} ml={3}>
                                {type === 'booking' ? 'Cancelar' : 'Eliminar'}
                            </Button>}
                            {isLoading ? (
                                <Button
                                    disabled={true}
                                >
                                    <Spinner />
                                </Button>
                            ) : <Button ref={cancelRef} onClick={onClose} >
                                Salir
                            </Button>}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
