import React, { useEffect, useState } from 'react'
import { useGlobalStorage } from '../../store/global'
import FirstStep from '../Steps/FirstStep'
import SecondStep from '../Steps/SecondStep'
import ThridStep from '../Steps/ThridStep'
import LastStep from '../Steps/LastStep'
import { useParams } from 'react-router-dom';
import { Box, Flex, Spinner, Stack, Step, StepIcon, StepIndicator, StepSeparator, StepStatus, Stepper, Text, useSteps } from '@chakra-ui/react'

export type contactProps = {
    goToNext: () => void;
    goToPrevious: () => void;
}

type stepType = {
    title: string;
    description: string;
}


export default function CreatedBooking() {
    const { fetchBoockingById, setCreateDataBooking, numberTravels, isLoading, createDataBooking } = useGlobalStorage()
    const { id } = useParams()
    const [steps, setSteps] = useState<stepType[]>([
        { title: 'Primero', description: 'Tu selección' },
        { title: 'Segundo', description: ' Contacto de emergencia' },
        { title: 'Tercero', description: 'Acompañantes' },
        { title: 'Ultimo', description: 'Detalle' },
    ])

    const { activeStep, goToNext, goToPrevious, } = useSteps({
        index: 0,
        count: steps.length,
    })

    useEffect(() => {
        console.log('ejecucion');
        setCreateDataBooking({})
        if (numberTravels! <= 1 && steps.length > 3) {
            setSteps(steps.filter(step => step.title !== 'Tercero'))
        }
        if (id) {
            fetchBoockingById(id)
            console.log('cargar una existente');
        }
        return () => {
            if (id) {
                setCreateDataBooking({})
            }
        }
    }, [fetchBoockingById, id, numberTravels, setCreateDataBooking, steps])


    return (
        <>
            {
                isLoading ?
                    <Flex m={5} justifyContent={'center'}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex> :
                    <Box my={8}>
                        <Stack mb={5}>
                            <Stepper size='sm' index={activeStep} gap='0'>
                                {steps.map((step, index) => (
                                    <Step key={index} style={{ gap: 0 }} >
                                        <StepIndicator>
                                            <StepStatus complete={<StepIcon />} />
                                        </StepIndicator>
                                        <StepSeparator style={{ marginLeft: 0 }} />
                                    </Step>
                                ))}
                            </Stepper>
                        </Stack>

                        <Box>
                            {
                                steps.length > 3 ?
                                    <>
                                        {activeStep === 0 && <FirstStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                        {activeStep === 1 && <SecondStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                        {activeStep === 2 && <ThridStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                        {activeStep === 3 && <LastStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                    </> :
                                    <>
                                        {activeStep === 0 && <FirstStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                        {activeStep === 1 && <SecondStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                        {activeStep === 2 && <LastStep goToNext={goToNext} goToPrevious={goToPrevious} />}
                                    </>
                            }

                        </Box>
                    </Box>
            }
        </>
    )

}
