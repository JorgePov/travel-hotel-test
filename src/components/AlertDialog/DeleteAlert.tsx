/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Spinner, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { changedStateBooking } from '../../services/bookingService';
import { changedStateRoom } from '../../services/roomService';
import { changedStateHotel } from '../../services/hotelService';
import { useGlobalStorage } from '../../store/global';

interface DeleteAlerts {
    idElement: string;
    idPather?: string;
    type: "booking" | "room" | "hotel"
    state?: "active" | "inactive"
}

const stateInvert = {
    active: 'inactive',
    inactive: 'active'
}

export default function DeleteAlert({ idElement, idPather = '', type, state }: DeleteAlerts) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const { fetchBooking, fetchBookingAdmin, fetchHotels, isAdmin, fetchRooms } = useGlobalStorage()

    const deleteBooking = async () => {
        await changedStateBooking(idElement, 'Cancelada')
        if (isAdmin) {
            await fetchBookingAdmin()
        } else {
            await fetchBooking()
        }
        onClose()
    }
    const deleteRoom = async () => {
        await changedStateRoom(idElement, idPather, stateInvert[state!])
        await fetchRooms(idPather)
        onClose()
    }
    const deleteHotel = async () => {
        await changedStateHotel(idElement, stateInvert[state!])
        await fetchHotels()
        onClose()
    }

    const handlerClick = async () => {
        setIsLoading(true)
        switch (type) {
            case 'booking':
                await deleteBooking();
                setIsLoading(false)
                break;
            case 'hotel':
                await deleteHotel()
                setIsLoading(false)
                break;
            default:
                await deleteRoom()
                setIsLoading(false)
                break;
        }

    }

    return (
        <>

            {isLoading ? (
                <Button
                    colorScheme={state === "inactive" ? 'green' : 'red'}
                    disabled={true}
                >
                    <Spinner />
                </Button >
            ) : <>
                {state === 'inactive' && type !== 'booking' ? <>
                    <Button colorScheme='green' onClick={onOpen}>
                        Activar
                    </Button>

                </> : <>
                    <Button colorScheme='red' onClick={onOpen}>
                        {type === 'booking' ? 'Cancelar' : 'Inactivar'}
                    </Button>
                </>}
            </>
            }


            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {type === 'booking' ? 'Cancelar reserva' : `${state === "active" ? 'Inactivar' : 'Activar'} ${type === 'room' ? 'habitacion' : 'hotel'}`}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Estas seguro? {isAdmin ? type === 'booking' ? 'La reserva sera cancelada' : `El cliente no podra ver este ${type === 'room' ? 'habitacion' : 'hotel'}` : 'No se podra revertir esta accion'}
                        </AlertDialogBody>

                        <AlertDialogFooter>

                            <Button ref={cancelRef} onClick={onClose} mr={4}>
                                Salir
                            </Button>
                            {isLoading ? (
                                <Button
                                    colorScheme={state === "inactive" ? 'green' : 'red'}
                                    disabled={true}
                                >
                                    <Spinner />
                                </Button>
                            ) : <Button colorScheme={state === "inactive" ? 'green' : 'red'} onClick={handlerClick} ml={3}>
                                {type === 'booking' ? 'Cancelar' : `${state === "active" ? 'Inactivar' : 'Activar'} `}
                            </Button>}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
