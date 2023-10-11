import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { HotelImages } from '../../utils/utils'
import { LocationNotFoundIcon } from '../shared/icons/CustomIcons'
import { useNavigate } from 'react-router'
import { Hotel } from '../../interfaces/Hotel'

export const CardHotelsSearched = () => {
  const { searchedHotels: hotels, setHotelSelected } = useGlobalStorage()
  const navigate = useNavigate()


  const handleGoRooms = (hotel: Hotel) => {
    setHotelSelected(hotel)
    navigate(`/dashboard/${hotel.id}`)

  }
  return (
    <>
      {
        hotels.length ?
          <Grid templateColumns='repeat(auto-fill,minmax(300px,1fr))' gap={6} >
            {
              hotels.map((hotel) => (
                <GridItem w='100%' key={hotel.id} >
                  <Card maxW='sm'>
                    <CardBody>
                      <Flex justifyContent={'center'}>
                        <Image
                          src={HotelImages[hotel.idImage]}
                          objectFit={'cover'}
                          alt='Green double couch with wooden legs'
                          borderRadius='lg'
                          maxH={'170px'}
                        />
                      </Flex>
                      <Stack mt='2' spacing='0'>
                        <Heading size='md'>{hotel.name}</Heading>
                        <Text fontSize='xs' >{hotel.city}</Text>
                      </Stack>
                      <Flex>
                        <Box flex={'1 1 auto'}>
                          <Flex>
                            <Text fontSize='sm' fontWeight={'semibold'}>
                              Check In:
                            </Text>
                            <Text fontSize='xs' alignSelf={'end'} ml={1}>
                              {hotel.checkInTime}
                            </Text>
                          </Flex>
                          <Flex>
                            <Text fontSize='sm' fontWeight={'semibold'}>
                              Check Out:
                            </Text>
                            <Text fontSize='xs' alignSelf={'end'} ml={1}>
                              {hotel.checkOutTime}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter justifyContent={'end'}>
                      <ButtonGroup spacing='2' >
                        <Button variant='solid' colorScheme='green' onClick={() => { handleGoRooms(hotel) }}>
                          Ver Habitaciones
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))
            }
          </Grid >
          :
          <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <LocationNotFoundIcon width={50} height={50} />
            <Heading as='h5' size='sm'>
              Por favor, realiza una búsqueda o intenta con otros filtros
            </Heading>
          </Flex>
      }
    </>
  )
}
