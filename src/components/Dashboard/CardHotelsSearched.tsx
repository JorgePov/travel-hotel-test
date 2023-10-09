import { Badge, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { HotelImages } from '../../utils/utils'
import { IconRooms, LocationNotFoundIcon } from '../shared/icons/CustomIcons'
import DeleteAlert from '../AlertDialog/DeleteAlert'

export const CardHotelsSearched = () => {
  const hotels = useGlobalStorage(state => state.searchedHotels)
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
                          {hotel.state === 'active' && <Badge colorScheme='green'>Activo</Badge>}
                          {hotel.state === 'inactive' && <Badge colorScheme='red'>Inactivo</Badge>}
                        </Box>
                        <Box alignSelf={'end'}>
                          <Flex justifyContent={'space-between'}>
                            <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                              Comision:
                            </Text>
                            <Text fontSize='xs' alignSelf={'end'}>
                              {(Number(hotel.comision) * 100)}%
                            </Text>

                          </Flex>
                        </Box>
                      </Flex>
                    </CardBody>
                    <Divider />
                    <CardFooter justifyContent={'end'}>
                      <ButtonGroup spacing='2' >
                        <Tooltip hasArrow placement='top' label='Habitaciones' fontSize='md'>
                          <Button variant='solid' colorScheme='green' >
                            <IconRooms width={20} height={20} fill='#fff' />
                          </Button>
                        </Tooltip>
                        <DeleteAlert idElement={hotel.id!} type='hotel' key={hotel.id} state={hotel.state} />
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
              Porfavor realiza una busqueda o intenta con otros filtros
            </Heading>
          </Flex>
      }
    </>
  )
}
