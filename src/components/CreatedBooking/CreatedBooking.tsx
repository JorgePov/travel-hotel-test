/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useGlobalStorage } from '../../store/global'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/stepper'
import { Box, Container, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { ArrowLeft, ArrowRight, ButtonFinish } from '../shared/icons/CustomIcons';
import FirstStep from '../Steps/FirstStep'
import SecondStep from '../Steps/SecondStep'
import ThridStep from '../Steps/ThridStep'
import LastStep from '../Steps/LastStep'
import { useNavigate } from 'react-router-dom';
import { EmergencyContact } from '../../interfaces/Booking'

export type contactProps = {
    goToNext: () => void;
    goToPrevious: () => void;
}

export default function CreatedBooking() {
    const { roomSelected, hotelSelected, travelDate, numberTravels, focusCity, isLoading } = useGlobalStorage()
    const [contactEmergency, setContactEmergency] = useState<String>()
    const [travels, setTravels] = useState<String>()
    const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>()
    const navigate = useNavigate()



    const steps = [
        { title: 'Primero', description: 'Reserva' },
        { title: 'Segundo', description: 'Contacto de emergencia' },
        { title: 'Tercero', description: 'Acompañantes' },
        { title: 'Ultimo', description: 'Detalle' },
    ]

    const { activeStep, goToNext, goToPrevious, } = useSteps({
        index: 0,
        count: steps.length,
    })


    const handlerGoToNext = () => {
        goToNext()

    }

    return (
        <Box my={8}>
            <Stepper index={activeStep} my={4}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />

                    </Step>
                ))}
            </Stepper>

            <Box>
                {activeStep === 0 && <FirstStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                {activeStep === 1 && <SecondStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                {activeStep === 2 && <ThridStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                {activeStep === 3 && <LastStep goToNext={goToNext} goToPrevious={goToPrevious} />}
            </Box>
        </Box>
    )

}
