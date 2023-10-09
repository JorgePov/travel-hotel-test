import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGlobalStorage } from '../../store/global';
import { Box, Container, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { timestampToString } from '../../utils/utils';

export const DetailsBooking = () => {
    const bookingSelect = useGlobalStorage(state => state.bookingSelect)
    const { data, reference } = bookingSelect;
    console.log(bookingSelect);
    /*  
     const { id } = useParams();
     console.log(id);
 
 
     useEffect(() => {
         fetchBookingById(id || '')
         console.log(bookingSelect);
 
     }, [fetchBookingById])
 
  */
    return (
        <Container maxW='container.xl' mt={4} border={'1px'}>
            <Flex>
                <Stack direction='row' spacing={2} alignSelf={'center'}>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '80px' }}
                        maxH={{ base: '80px' }}
                        borderRadius={'0.25rem'}
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    />
                </Stack>
                <Stack w='80%' p={4} >
                    <Text fontSize='xl' fontWeight='bold' >{reference.hotels.name}</Text>
                    <Text fontSize='xs' ><strong>Dirección:</strong> lalalala</Text>
                    <Text fontSize='xs' ><strong>Teléfono:</strong>  lalalala</Text>

                </Stack>
                <Stack w='20%' textAlign={'center'}>
                    <Text fontSize='xs' fontWeight='bold'  >Entrada</Text>
                    <Text fontSize='xs'  >{timestampToString(data.startTravel)}</Text>
                    <Text fontSize='xs' fontWeight='bold' >Check-in:</Text>
                    <Text fontSize='xs'  >{reference.hotels.checkInTime}</Text>
                </Stack>
                <Stack w='20%' textAlign={'center'}>
                    <Text fontSize='xs' fontWeight='bold'  >Salida</Text>
                    <Text fontSize='xs'  >{timestampToString(data.finishTravel)}</Text>
                    <Text fontSize='xs' fontWeight='bold' >Check-out:</Text>
                    <Text fontSize='xs'  >{reference.hotels.checkOutTime}</Text>
                </Stack>
            </Flex >

            <Divider />
            <Text fontSize='4xl' fontWeight='bold' >Precio</Text>
            <Flex>
                <Stack alignSelf={'center'} flex={'1 1 auto'} >
                    <Stack direction='row' justifyContent={'space-between'}>

                        <Text fontSize='md' >Precio</Text>

                        <Text fontSize='xs' >COP {reference.rooms.price}</Text>
                    </Stack>
                    <Stack direction='row' justifyContent={'space-between'}>
                        <Stack direction='row' >
                            <Text fontSize='md' >Impuesto </Text>
                            <Text fontSize='xs' alignSelf={'center'} >%{reference.rooms.tax * 100}</Text>

                        </Stack>
                        <Text fontSize='xs' >COP {reference.rooms.price * reference.rooms.tax}</Text>
                    </Stack>
                    <Stack direction='row' justifyContent={'space-between'}>

                        <Text fontSize='md' >Precio Total</Text>

                        <Text fontSize='xs' >COP {reference.rooms.price + (reference.rooms.price * reference.rooms.tax)}</Text>
                    </Stack>
                </Stack>
            </Flex>
            {
                !reference.travels ?
                    <>
                        <Divider />
                        <Text fontSize='4xl' fontWeight='bold' >Tus Acompañantes</Text>
                        <Flex>
                            <Stack alignSelf={'center'} flex={'1 1 auto'} >
                                <Stack direction='row' justifyContent={'space-between'}>

                                    <Text fontSize='md' >Precio</Text>

                                    <Text fontSize='xs' >COP {reference.rooms.price}</Text>
                                </Stack>
                                <Stack direction='row' justifyContent={'space-between'}>
                                    <Stack direction='row' >
                                        <Text fontSize='md' >Impuesto </Text>
                                        <Text fontSize='xs' alignSelf={'center'} >%{reference.rooms.tax * 100}</Text>

                                    </Stack>
                                    <Text fontSize='xs' >COP {reference.rooms.price * reference.rooms.tax}</Text>
                                </Stack>
                                <Stack direction='row' justifyContent={'space-between'}>

                                    <Text fontSize='md' >Precio Total</Text>

                                    <Text fontSize='xs' >COP {reference.rooms.price + (reference.rooms.price * reference.rooms.tax)}</Text>
                                </Stack>
                            </Stack>
                        </Flex>
                    </> : null
            }
            {
                !reference.travels ?
                    <>
                        <Divider />
                        <Text fontSize='4xl' fontWeight='bold' >Tus Acompañantes</Text>
                        <Flex>
                            <Stack alignSelf={'center'} flex={'1 1 auto'} >
                                <Stack direction='row' justifyContent={'space-between'}>

                                    <Text fontSize='md' >Precio</Text>

                                    <Text fontSize='xs' >COP {reference.rooms.price}</Text>
                                </Stack>
                                <Stack direction='row' justifyContent={'space-between'}>
                                    <Stack direction='row' >
                                        <Text fontSize='md' >Impuesto </Text>
                                        <Text fontSize='xs' alignSelf={'center'} >%{reference.rooms.tax * 100}</Text>

                                    </Stack>
                                    <Text fontSize='xs' >COP {reference.rooms.price * reference.rooms.tax}</Text>
                                </Stack>
                                <Stack direction='row' justifyContent={'space-between'}>

                                    <Text fontSize='md' >Precio Total</Text>

                                    <Text fontSize='xs' >COP {reference.rooms.price + (reference.rooms.price * reference.rooms.tax)}</Text>
                                </Stack>
                            </Stack>
                        </Flex>
                    </> : null
            }


        </Container >
    )
}
