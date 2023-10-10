import React from 'react'
import { useGlobalStorage } from '../../store/global'
import { contactProps } from '../CreatedBooking/CreatedBooking'
import { Button, Flex } from '@chakra-ui/react'
import { ArrowRight } from '../shared/icons/CustomIcons'
import { useNavigate } from 'react-router-dom'

export default function FirstStep({ goToNext, goToPrevious }: contactProps) {
    const { roomSelected, hotelSelected, travelDate, userInfo, setCreateDataBooking, createDataBooking } = useGlobalStorage()
    const navigate = useNavigate()

    const handleGoToNext = () => {
        setCreateDataBooking({
            ...createDataBooking,
            idHotel: hotelSelected?.id,
            idRoom: roomSelected?.id,
            idUser: userInfo?.id,
            state: 'Reservada',
            finishTravel: travelDate?.finishDate,
            startTravel: travelDate?.startDate,
        })
        console.log(createDataBooking);
        goToNext()

    }
    return (
        <>
            <Flex justifyContent={'space-around'}>
                <Button colorScheme='red' onClick={() => navigate(`/dashboard/${hotelSelected?.id}`)}>
                    Regresar
                </Button>
                <Button colorScheme='blue' onClick={handleGoToNext}>
                    Siguiente
                    <ArrowRight width={24} height={24} fill='white' />
                </Button>
            </Flex>
        </>

    )
}
