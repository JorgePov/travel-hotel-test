/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useGlobalStorage } from '../../store/global'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/stepper'
import { Box, Container, Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { ArrowLeft, ArrowRight, ButtonFinish } from '../shared/icons/CustomIcons';
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThridStep from './Steps/ThridStep'
import LastStep from './Steps/LastStep'

export default function CreatedBooking() {
    const { roomSelected, hotelSelected, travelDate, numberTravels, focusCity, isLoading } = useGlobalStorage()
    const [contactEmergency, setContactEmergency] = useState<String>()
    const [travels, setTravels] = useState<String>()



    const steps = [
        { title: 'Primero', description: 'Reserva' },
        { title: 'Segundo', description: 'Contacto de emergencia' },
        { title: 'Tercero', description: 'Acompañantes' },
        { title: 'Ultimo', description: 'Detalle' },
    ]

    const { activeStep, goToNext, goToPrevious, } = useSteps({
        index: 1,
        count: steps.length,
    })

    const handlerGoToNext = () => {

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
                {activeStep === 0 && <FirstStep />}
                {activeStep === 1 && <SecondStep />}
                {activeStep === 2 && <ThridStep />}
                {activeStep === 3 && <LastStep />}
            </Box>

            <Flex justifyContent={'space-around'}>
                {activeStep !== 0 ?
                    <Button colorScheme='blue' onClick={goToPrevious}>
                        <ArrowLeft width={24} height={24} fill='white' />
                        Anterior
                    </Button> : null
                }
                {activeStep !== 3 ?
                    <Button colorScheme='blue' onClick={goToNext}>
                        Siguiente
                        <ArrowRight width={24} height={24} fill='white' />
                    </Button> : null
                }
                {activeStep === 3 ?
                    <Button colorScheme='green' onClick={goToPrevious}>
                        Finalizar <ButtonFinish width={18} height={18} fill='none' />
                    </Button> : null
                }

            </Flex>

        </Box>
    )

}
