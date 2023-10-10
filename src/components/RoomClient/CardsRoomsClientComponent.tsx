import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text, } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { Room } from '../../interfaces/Hotel'
import { HotelImages, RoomImages } from '../../utils/utils'
import { useNavigate } from 'react-router'


const roomTypeInvert = {
  shared: 'Compartida',
  simple: 'Sencilla',
  double: 'Doble',
  family: 'Familiar',
  suit: 'Suit'

}

export const CardsRoomsClientComponent = () => {
  const navigate = useNavigate()
  const { rooms, hotelSelected, setRoomSelected } = useGlobalStorage()

  const handleClick = (room: Room) => {
    setRoomSelected(room)
    navigate(`/booking/${room.id}`)
  }


  return (
    <>
      <Box my={5}>
        <Box mb={5}>
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            alignItems='center'
            p={'1.5rem'}

          >
            <Flex direction={{ base: 'column', sm: 'row' }} alignItems='center' flex={'1 1 auto'} >
              <Stack direction='row' spacing={4}>
                <Image
                  src={HotelImages[hotelSelected?.idImage!]}
                  objectFit={'cover'}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                  minH={'170px'}
                  maxH={'170px'}
                />
              </Stack>

              <Stack direction='row' flex={'1 1 auto'} spacing={'auto'}>
                <CardBody p={0} ml={'1.5rem'}>
                  <Heading size={'1rem'}>{hotelSelected?.name}</Heading>
                  <Text fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                    {hotelSelected?.city}
                  </Text>
                  <Flex>
                    <Text fontSize='sm' fontWeight={'semibold'}>
                      Check In:
                    </Text>
                    <Text fontSize='xs' alignSelf={'end'} ml={1}>
                      {hotelSelected?.checkInTime}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontSize='sm' fontWeight={'semibold'}>
                      Check Out:
                    </Text>
                    <Text fontSize='xs' alignSelf={'end'} ml={1}>
                      {hotelSelected?.checkOutTime}
                    </Text>
                  </Flex>
                </CardBody>
              </Stack>
            </Flex>
          </Card>
        </ Box>
        <Grid templateColumns='repeat(auto-fill,minmax(300px,1fr))' gap={6} >
          {
            rooms.map((room) => (
              <GridItem w='100%' key={room.id} >
                <Card maxW='sm'>
                  <CardBody>
                    <Flex justifyContent={'center'}>
                      <Image
                        src={RoomImages[room.roomType]}
                        objectFit={'cover'}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'

                        minH={'170px'}
                        maxH={'170px'}
                      />
                    </Flex>
                    <Stack mt='2' spacing='0'>
                      <Heading size='md'>Habitacion {room.numberRoom} - {roomTypeInvert[room.roomType]} </Heading>
                      <Text fontSize='xs' >{room.ubication}</Text>
                    </Stack>
                    <Flex>
                      <Box flex={'1 1 auto'}>
                        <Stack spacing='0' >
                          <Text fontSize='sm' fontWeight={'semibold'}>
                            descripcion:
                          </Text>
                          <Text fontSize='xs'>
                            {room.description}
                          </Text>
                        </Stack>
                      </Box>
                      <Box justifyContent={'end'}>
                        <Flex justifyContent={'space-between'}>
                          <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                            Precio:
                          </Text>
                          <Text fontSize='xs' alignSelf={'end'} fontWeight={'light'}>
                            COP {(Number(room.price))}
                          </Text>

                        </Flex>
                        <Flex justifyContent={'space-between'}>
                          <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                            Impuesto ({(Number(room.tax) * 100)}%):
                          </Text>
                          <Text fontSize='xs' fontWeight={'light'}>
                            COP {(Number(room.tax) * Number(room.price))}
                          </Text>
                        </Flex>
                        <Flex justifyContent={'space-between'}>
                          <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                            Precio total:
                          </Text>
                          <Text fontSize='xs' fontWeight={'light'}>
                            COP {(Number(room.price) + (Number(room.tax) * Number(room.price)))}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </CardBody>
                  <Divider />
                  <CardFooter justifyContent={'end'}>
                    <ButtonGroup spacing='2' >
                      <Button variant='solid' colorScheme='blue' onClick={() => { handleClick(room) }} >
                        Reservar
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </GridItem >
            ))
          }
        </Grid >
      </Box>
    </>

  )
}
