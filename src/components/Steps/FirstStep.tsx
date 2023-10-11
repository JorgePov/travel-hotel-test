import { useGlobalStorage } from '../../store/global'
import { contactProps } from '../CreatedBooking/CreatedBooking'
import { Box, Button, Card, Center, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { ArrowRight } from '../shared/icons/CustomIcons'
import { useNavigate } from 'react-router-dom'
import { timestampToStringFullDate, formatCurrency, roomTypeInvert } from '../../utils/utils';
import { Billing } from '../../interfaces/Booking'


export default function FirstStep({ goToNext, goToPrevious }: contactProps) {
    const { roomSelected, hotelSelected, travelDate, userInfo, setCreateDataBooking, createDataBooking, numberTravels, totalDays } = useGlobalStorage()
    const navigate = useNavigate()

    const billing: Billing = {
        price: totalDays <= 1 ? roomSelected?.price! : roomSelected?.price! * totalDays,
        tax: totalDays <= 1 ? (roomSelected?.price! * roomSelected?.tax!) : ((roomSelected?.price! * totalDays) * roomSelected?.tax!),
        total: totalDays <= 1 ? (roomSelected?.price! + (roomSelected?.price! * roomSelected?.tax!)) : ((roomSelected?.price! * totalDays) + ((roomSelected?.price! * totalDays) * roomSelected?.tax!))

    }

    const handleGoToNext = () => {
        setCreateDataBooking({
            ...createDataBooking,
            idHotel: hotelSelected?.id,
            idRoom: roomSelected?.id,
            idUser: userInfo?.id,
            numberTravels: numberTravels,
            state: 'Reservada',
            finishTravel: travelDate?.finishDate,
            startTravel: travelDate?.startDate,
            totalDays: totalDays,
            billing
        })
        console.log(createDataBooking);
        goToNext()

    }

    const handleGoBack = () => {
        navigate(`/dashboard/${hotelSelected?.id}`)
    }

    return (
        <>
            <Flex justifyContent={'center'}>
                <Card variant={'elevated'} my={4} w={'65%'} >
                    <Box p={5}>
                        <Text fontSize={'4xl'} textAlign={'center'} fontWeight={'medium'} mb={3}>Detalle de tu reservación</Text>
                        <Stack spacing={2}>
                        </Stack>
                        <Stack justifyContent={'start'} spacing={0} mb={3}>
                            <Text fontSize={'md'} textAlign={'center'} fontWeight={'medium'} mb={3}>  Informacion de hospedaje</Text>
                            <Text fontSize={'md'} fontWeight={'bold'} mb={2}> {hotelSelected?.name} - Habitación {roomSelected?.numberRoom}</Text>
                            <Stack spacing={0}>
                                <Flex>
                                    <Text fontSize={'md'} fontWeight={'medium'}>Tipo de habitación: </Text>
                                    <Text fontSize={'md'} fontWeight={'light'} ml={2}>{roomTypeInvert[roomSelected?.roomType!]} </Text>
                                </Flex>
                                <Flex>
                                    <Text fontSize={'md'} fontWeight={'medium'}>Ubicacion: </Text>
                                    <Text fontSize={'md'} fontWeight={'light'} ml={2}>{roomSelected?.ubication} </Text>
                                </Flex>
                                <Flex>
                                    <Text fontSize={'md'} fontWeight={'medium'}>Descripcion: </Text>
                                    <Text fontSize={'md'} fontWeight={'light'} ml={2}>{roomSelected?.description} </Text>
                                </Flex>
                            </Stack>
                        </Stack>
                        <Divider orientation='horizontal' />
                        <Stack justifyContent={'start'} spacing={0} my={2}>
                            <Text fontSize={'md'} fontWeight={'bold'} mb={3}> Desglose del precio</Text>
                            <Stack direction={'row'} justifyContent={'space-between'}>

                                <Text fontSize={'md'} fontWeight={'normal'} > Precio habitacion{totalDays <= 1 ? null : ` x ${totalDays} Días`} </Text>
                                <Text fontSize={'md'} fontWeight={'normal'} > {formatCurrency(billing.price)}</Text>

                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
                                <Text fontSize={'md'} fontWeight={'normal'} > Impuesto (%{roomSelected?.tax! * 100})</Text>
                                <Text fontSize={'md'} fontWeight={'normal'} > {formatCurrency(billing.tax)}</Text>
                            </Stack>
                            <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
                                <Text fontSize={'2xl'} fontWeight={'bold'} > Total</Text>
                                <Text fontSize={'2xl'} fontWeight={'bold'} > {formatCurrency(billing.total)}</Text>
                            </Stack>
                        </Stack>
                        <Divider orientation='horizontal' />
                        <Flex justifyContent={'space-evenly'} mt={3}>
                            <Stack justifyContent={'center'}>
                                <Text fontSize={'md'} textAlign={'center'} fontWeight={'medium'} mb={2}> Check-in</Text>
                                <Text fontSize={'md'} textAlign={'center'} fontWeight={'bold'} > {timestampToStringFullDate(travelDate?.startDate!)}</Text>
                                <Text fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} > De {hotelSelected?.checkInTime}</Text>
                            </Stack>
                            <Center >
                                <Divider orientation='vertical' />
                            </Center>
                            <Stack justifyContent={'center'} >
                                <Text fontSize={'md'} textAlign={'center'} fontWeight={'medium'} mb={2}> Check-out</Text>
                                <Text fontSize={'md'} textAlign={'center'} fontWeight={'bold'} > {timestampToStringFullDate(travelDate?.finishDate!)}</Text>
                                <Text fontSize={'sm'} textAlign={'center'} fontWeight={'medium'} > A {hotelSelected?.checkOutTime}</Text>
                            </Stack>
                        </Flex>
                    </Box>
                </Card >
            </Flex >
            <Flex justifyContent={'space-around'}>
                <Button colorScheme='red' onClick={handleGoBack}>
                    Habitaciónes
                </Button>
                <Button colorScheme='blue' onClick={handleGoToNext}>
                    Continuar
                    <ArrowRight width={24} height={24} fill='white' />
                </Button>
            </Flex>
        </>

    )
}
