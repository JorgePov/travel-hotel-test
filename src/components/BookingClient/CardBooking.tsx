import { Card, CardBody, Heading, Image, Stack, Text, Box, Button, Flex, Spinner, Badge } from '@chakra-ui/react';
import "./BookingClient.css";
import DeleteAlert from '../AlertDialog/DeleteAlert';
import { useGlobalStorage } from '../../store/global';
import { useNavigate } from 'react-router-dom';
import { HotelImages, formatCurrency, timestampToString } from '../../utils/utils';
import { changedStateBooking } from '../../services/bookingService';
import { useState } from 'react';

export default function CardBooking() {
    const booking = useGlobalStorage(state => state.booking)
    const isAdmin = useGlobalStorage(state => state.isAdmin)
    const fetchBookingById = useGlobalStorage(state => state.fetchBookingById)
    const navegate = useNavigate();

    const handlerClick = async (id: string) => {
        await fetchBookingById(id)
        if (isAdmin) {
            navegate(`/admin/reservations/${id}`)
        } else {

            navegate(`/dashboard/myreservations/${id}`)
        }
    }

    return (
        <>
            {booking.map(({ data, reference }) => (
                <Box my={5} key={data.id}>
                    <Box mb={5}>
                        <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight='bold' >{reference.hotels.city}</Text>
                        <Text fontSize='sm'  >{timestampToString(data.startTravel)} - {timestampToString(data.finishTravel)}</Text>
                    </Box>

                    <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        alignItems='center'
                        p={'1.5rem'}
                        boxShadow={'0 2px 8px 0 rgba(26,26,26,0.16)'}
                        cursor={'pointer'}
                        className='hoverBox'
                        justifyItems={'center'}

                    >
                        <Flex direction={{ base: 'column', sm: 'row' }} alignItems='center' flex={'1 1 auto'} onClick={() => handlerClick(data.id)} w={'100%'}>


                            <Stack direction='row' spacing={4}>
                                <Image
                                    objectFit='cover'
                                    maxW={{ base: '80px' }}
                                    maxH={{ base: '80px' }}
                                    borderRadius={'0.25rem'}
                                    src={HotelImages[reference.hotels.idImage]}
                                    alt='Caffe Latte'
                                />
                            </Stack>

                            <Stack direction={'row'} flex={{ sm: '1 1 auto' }} my={{ base: 4, sm: 0 }} w={'100%'}>
                                <Stack direction='row' flex={'1 1 auto'}>
                                    <CardBody p={0} ml={{ sm: '1.5rem' }}>
                                        <Heading size={'1rem'}>{reference.hotels.name}</Heading>
                                        <Text fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                                            {reference.rooms.name}
                                        </Text>
                                        <Text mt={'2'} fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                                            {timestampToString(data.startTravel)} - {timestampToString(data.finishTravel)}, {reference.hotels.city}
                                        </Text>
                                        <Text mt={'2'} fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                                            <Badge borderRadius='full' colorScheme={data.state === 'Cancelada' ? 'red' : data.state === 'Completada' ? 'green' : 'purple'}>{data.state}</Badge>
                                        </Text>
                                    </CardBody>
                                </Stack>
                                <Stack direction='row' spacing={4} alignSelf={'start'}>
                                    <Text mt={'2'} fontSize={'sm'} fontWeight={'bold'} lineHeight={'3'}>
                                        {formatCurrency(data?.billing?.total)}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Flex>

                        {
                            data.state === 'Reservada' ? <>
                                <Stack direction='column' spacing={4} alignSelf={'start'} ml={4} display={{ base: 'contents', sm: 'flex' }} >
                                    <ButtomComplited idBooking={data.id} />
                                    <DeleteAlert idElement={data.id} type='booking' />
                                </Stack>
                            </> : null
                        }

                    </Card>
                </ Box >
            ))
            }
        </>

    )
}





export const ButtomComplited = ({ idBooking }: any) => {
    const isAdmin = useGlobalStorage(state => state.isAdmin)
    const { fetchBookingAdmin } = useGlobalStorage()

    const [isLoading, setLoading] = useState(false)


    const handlerClickCompleted = async () => {
        setLoading(true)
        if (isAdmin) {
            await changedStateBooking(idBooking, 'Completada')
            await fetchBookingAdmin()
        }
        setLoading(false)
    }

    return (
        <>
            {
                isAdmin ?
                    <>
                        {isLoading ? (
                            <Button
                                colorScheme='green'
                                disabled={true}
                            >
                                <Spinner />
                            </Button>
                        ) : <Button colorScheme='green' onClick={handlerClickCompleted}>
                            Completar
                        </Button>}

                    </> : null
            }
        </>

    )
}
