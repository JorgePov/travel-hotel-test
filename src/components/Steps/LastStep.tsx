import React from 'react'
import { useGlobalStorage } from '../../store/global'
import { contactProps } from '../CreatedBooking/CreatedBooking'
import { Button, Flex } from '@chakra-ui/react'
import { ArrowLeft, ButtonFinish } from '../shared/icons/CustomIcons'

export default function LastStep({ goToNext, goToPrevious }: contactProps) {
    const { fetchCreatedBooking, createDataBooking } = useGlobalStorage()

    const handleGoToNext = () => {
        console.log(createDataBooking);
        fetchCreatedBooking();

    }
    return (
        <>
            <Flex justifyContent={'space-around'}>
                <Button colorScheme='blue' onClick={goToPrevious}>
                    <ArrowLeft width={24} height={24} fill='white' />
                    Anterior
                </Button>
                <Button colorScheme='green' onClick={handleGoToNext}>
                    Finalizar <ButtonFinish width={18} height={18} fill='none' />
                </Button>
            </Flex>
        </>

    )
}
