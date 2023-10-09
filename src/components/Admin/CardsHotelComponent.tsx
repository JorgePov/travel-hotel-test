import { Badge, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { IconEdit, IconRooms } from '../shared/icons/CustomIcons'
import DeleteAlert from '../AlertDialog/DeleteAlert'
import { EditHotelModal } from './EditHotelModal'
import { useState } from 'react'
import { Hotel } from '../../interfaces/Hotel'

export const CardsHotelComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hotelInfo, setHotelInfo] = useState<Hotel>()
  const hotels = useGlobalStorage(state => state.hotels)

  const handleEditHotel = (hotel: Hotel) => {
    setHotelInfo(hotel)
    onOpen()
  }
  return (
    <>
      <Grid templateColumns='repeat(auto-fill,minmax(300px,1fr))' gap={6} >
        {
          hotels.map((hotel) => (
            <GridItem w='100%' key={hotel.id} >
              <Card maxW='sm'>
                <CardBody>
                  <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                  <Stack mt='6' spacing='3'>
                    <Stack mt='0' spacing='0'>
                      <Heading size='md'>{hotel.name}</Heading>
                      <Heading as='h6' size='xs'>{hotel.city}</Heading>
                    </Stack>
                    <Text>
                      Check In: {hotel.checkInTime}
                    </Text>
                    <Text>
                      Check Out: {hotel.checkOutTime}
                    </Text>
                  </Stack>
                  {hotel.state === 'active' && <Badge colorScheme='green'>Activo</Badge>}
                  {hotel.state === 'inactive' && <Badge colorScheme='red'>Inactivo</Badge>}
                  <Flex justifyContent={'end'}>
                    <strong>
                      Comision: {(Number(hotel.comision) * 100)}%
                    </strong>
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
                      <Button variant='solid' colorScheme='green'>
                        <IconRooms width={20} height={20} fill='#fff' />
                      </Button>
                    </Tooltip>
                    <DeleteAlert idElement={hotel.id!} type='hotel' key={hotel.id} />
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
