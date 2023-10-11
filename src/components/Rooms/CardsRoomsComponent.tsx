import { Badge, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { IconEdit } from '../shared/icons/CustomIcons'
import DeleteAlert from '../AlertDialog/DeleteAlert'
import { useState } from 'react'
import { Room } from '../../interfaces/Hotel'
import { RoomImages, formatCurrency, roomTypeInvert } from '../../utils/utils'
import { EditRoomModal } from './EditRoomModal'
import { useParams } from 'react-router'

export const CardsRoomsComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [roomInfo, setHotelInfo] = useState<Room>()
  const rooms = useGlobalStorage(state => state.rooms)
  const { id } = useParams()


  const handleEditHotel = (room: Room) => {
    setHotelInfo(room)
    onOpen()
  }
  return (
    <>
      <Grid templateColumns='repeat(auto-fill,minmax(300px,1fr))' gap={6} >
        {
          rooms.map((room) => (
            <GridItem w='100%' key={room.id} >
              <Card maxW={{ base: '100%', sm: 'sm' }}>
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
                        <Text fontSize='xs' >
                          {room.description}
                        </Text>
                      </Stack>
                      {room.state === 'active' && <Badge borderRadius='full' colorScheme='teal'>Activo</Badge>}
                      {room.state === 'inactive' && <Badge borderRadius='full' colorScheme='red'>Inactivo</Badge>}
                    </Box>
                    <Box justifyContent={'end'}>
                      <Flex justifyContent={'space-between'}>
                        <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                          Precio:
                        </Text>
                        <Text fontSize='xs' alignSelf={'end'}>
                          {formatCurrency(Number(room.price))}
                        </Text>

                      </Flex>
                      <Flex justifyContent={'space-between'}>
                        <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                          Impuesto ({(Number(room.tax) * 100)}%):
                        </Text>
                        <Text fontSize='xs'>
                          {formatCurrency(Number((Number(room.tax) * Number(room.price))))}
                        </Text>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                        <Text fontSize='xs' fontWeight={'semibold'} alignSelf={'end'} mr={1}>
                          Precio total:
                        </Text>
                        <Text fontSize='xs'>
                          {formatCurrency(Number((Number(room.price) + (Number(room.tax) * Number(room.price)))))}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </CardBody>
                <Divider />
                <CardFooter justifyContent={'end'}>
                  <ButtonGroup spacing='2' >
                    <Tooltip hasArrow placement='top' label='Modificar' fontSize='md'>
                      <Button variant='solid' colorScheme='blue' onClick={() => handleEditHotel(room)}>
                        <IconEdit width={20} height={20} fill='#fff' />
                      </Button>
                    </Tooltip>
                    <DeleteAlert idElement={room.id!} idPather={id} type='room' key={room.id} state={room.state} />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem >
          ))
        }
      </Grid >
      <EditRoomModal onClose={onClose} isOpen={isOpen} roomInfo={roomInfo!} />
    </>

  )
}
