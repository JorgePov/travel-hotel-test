import { Badge, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { IconEdit, IconRooms } from '../shared/icons/CustomIcons'
import DeleteAlert from '../AlertDialog/DeleteAlert'
import { EditHotelModal } from './EditHotelModal'
import { useState } from 'react'
import { Hotel } from '../../interfaces/Hotel'
import { HotelImages } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

export const CardsHotelComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hotelInfo, setHotelInfo] = useState<Hotel>()
  const navigate = useNavigate();
  const hotels = useGlobalStorage(state => state.hotels)

  const handleEditHotel = (hotel: Hotel) => {
    setHotelInfo(hotel)
    onOpen()
  }

  const handleGoRooms = ({ id }: Hotel) => {
    navigate(`/admin/${id}`)

  }
  return (
    <>
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
                      minH={'170px'}
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
                      {hotel.state === 'active' && <Badge borderRadius='full' colorScheme='teal'>Activo</Badge>}
                      {hotel.state === 'inactive' && <Badge borderRadius='full' colorScheme='red'>Inactivo</Badge>}
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
                    <Tooltip hasArrow placement='top' label='Modificar' fontSize='md'>
                      <Button variant='solid' colorScheme='blue' onClick={() => handleEditHotel(hotel)}>
                        <IconEdit width={20} height={20} fill='#fff' />
                      </Button>
                    </Tooltip>
                    <Tooltip hasArrow placement='top' label='Habitaciones' fontSize='md'>
                      <Button variant='solid' colorScheme='green' onClick={() => { handleGoRooms(hotel) }}>
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
      <EditHotelModal onClose={onClose} isOpen={isOpen} hotelInfo={hotelInfo!} />
    </>

  )
}
