import { useGlobalStorage } from '../../store/global';
import { Avatar, Badge, Container, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { timestampToString, formatCurrency, HotelImages } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export const DetailsBooking = () => {
    const bookingSelect = useGlobalStorage(state => state.bookingSelect)
    const isAdmin = useGlobalStorage(state => state.isAdmin)
    const { data, reference } = bookingSelect;
    const navigate = useNavigate();

    const handleBackBookings = () => {
        if (isAdmin) {
            navigate('/admin/reservations')
        } else {
            navigate('/dashboard/myreservations')
        }
    }


    return (
        <Container maxW='container.xl' my={4} border={'1px'} onClick={handleBackBookings} cursor={'pointer'}>
            <Flex direction={{ base: 'column', sm: 'row' }}>
                <Stack direction='row' flex={'1 1 auto'}>
                    <Stack direction='row' spacing={2} alignSelf={'center'}>
                        <Image
                            objectFit='cover'
                            maxW={{ base: '80px' }}
                            maxH={{ base: '80px' }}
                            borderRadius={'0.25rem'}
                            src={HotelImages[reference.hotels.idImage]}
                            alt='Caffe Latte'
                        />
                    </Stack>
                    <Stack w='80%' p={4} >
                        <Text fontSize='xl' fontWeight='bold' >{reference.hotels.name}</Text>

                        <Text fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                            <Badge borderRadius='full' colorScheme={data.state === 'Cancelada' ? 'red' : data.state === 'Completada' ? 'green' : 'purple'}>{data.state}</Badge>
                        </Text>
                        <Text fontSize='xs' ><strong>Dirección:</strong> {reference.hotels.address}</Text>
                        <Text fontSize='xs' ><strong>Teléfono:</strong>  {reference.hotels.phoneNumber}</Text>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                    <Stack textAlign={'center'}>
                        <Text fontSize='xs' fontWeight='bold'  >Entrada</Text>
                        <Text fontSize='xs'  >{timestampToString(data.startTravel)}</Text>
                        <Text fontSize='xs' fontWeight='bold' >Check-in:</Text>
                        <Text fontSize='xs'  >{reference.hotels.checkInTime}</Text>
                    </Stack>
                    <Stack textAlign={'center'}>
                        <Text fontSize='xs' fontWeight='bold'  >Salida</Text>
                        <Text fontSize='xs'  >{timestampToString(data.finishTravel)}</Text>
                        <Text fontSize='xs' fontWeight='bold' >Check-out:</Text>
                        <Text fontSize='xs'  >{reference.hotels.checkOutTime}</Text>
                    </Stack>
                </Stack>
            </Flex >

            <Divider />
            <Text fontSize='4xl' fontWeight='bold' >Precio</Text>
            <Flex>
                <Stack alignSelf={'center'} flex={'1 1 auto'} >
                    <Stack direction='row' justifyContent={'space-between'}>

                        <Text fontSize='md' >Precio</Text>

                        <Text fontSize='xs' >{formatCurrency(data?.billing?.price)}</Text>
                    </Stack>
                    <Stack direction='row' justifyContent={'space-between'}>
                        <Stack direction='row' >
                            <Text fontSize='md' >Impuesto </Text>
                            <Text fontSize='xs' alignSelf={'center'} >%{reference.rooms.tax * 100}</Text>

                        </Stack>
                        <Text fontSize='xs' >{formatCurrency(data?.billing?.tax)}</Text>
                    </Stack>
                    <Stack direction='row' justifyContent={'space-between'}>

                        <Text fontSize='md' >Precio Total</Text>

                        <Text fontSize='xs' >{formatCurrency(data?.billing?.total)}</Text>
                    </Stack>
                </Stack>
            </Flex>
            {
                isAdmin ? <>
                    <Flex>
                        <Stack alignSelf={'center'} flex={'1 1 auto'} >
                            <Stack direction='row' justifyContent={'space-between'}>
                                <Stack direction='row' >
                                    <Text fontSize='md' color={'green.500'}>Ganancia </Text>
                                    <Text fontSize='xs' alignSelf={'center'} color={'green.500'}>%{reference.hotels.comision * 100}</Text>
                                </Stack>
                                <Text fontSize='xs' color={'green.500'}>{formatCurrency(data?.billing?.price * reference.hotels.comision)}</Text>
                            </Stack>
                        </Stack>
                    </Flex>
                </> : null
            }

            {
                data.travels ?
                    <>
                        <Divider />
                        <Text fontSize='2xl' fontWeight='bold' >Tus Acompañantes</Text>
                        <Stack direction={'column'}>
                            {
                                data.travels.map(({ email, name, phoneNumber }: any) => (

                                    <Stack direction={'row'} my={4} key={email}>
                                        <Avatar bg='red.500' />
                                        <Stack direction={'column'}>
                                            <Text fontSize='md' >Nombre: {name}</Text>
                                            <Text fontSize='md' >Correo electrónico: {email}</Text>
                                            <Text fontSize='md' >Telefono: {phoneNumber}</Text>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </> : null
            }
            {
                data.emergencyContact ?
                    <>
                        <Divider />
                        <Text fontSize='2xl' fontWeight='bold' textAlign={'center'}>Contacto de Emergencia</Text>
                        <Flex mb={4} justifyContent={'center'}>
                            <Stack alignSelf={'center'}  >
                                <Stack direction='row' justifyContent={'center'}>
                                    <Text fontSize='md' >Nombre:</Text>
                                    <Text fontSize='md' >{data.emergencyContact.name}</Text>
                                </Stack>
                                <Stack alignSelf={'center'} >
                                    <Stack direction='row' justifyContent={'center'}>
                                        <Text fontSize='md' >Telefono: </Text>
                                        <Text fontSize='md' >{data.emergencyContact.phoneNumber}</Text>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Flex>
                    </> : null
            }


        </Container >
    )
}
