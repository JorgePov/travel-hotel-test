import { Badge, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Grid, GridItem, Heading, Image, Stack, Text, Tooltip } from '@chakra-ui/react'
import { useGlobalStorage } from '../../store/global'
import { IconDelete, IconEdit, IconRooms } from '../shared/icons/CustomIcons'

export const CardsHotelComponent = () => {
  const hotels = useGlobalStorage(state => state.hotels)
  return (
    <>
      <Grid templateColumns='repeat(auto-fill,minmax(300px,1fr))' gap={6} >
        {
          hotels.map(({ name, city, checkInTime, checkOutTime, id, state, comision }) => (
            <GridItem w='100%' key={id} >
              <Card maxW='sm'>
                <CardBody>
                  <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                  <Stack mt='6' spacing='3'>
                    <Stack mt='0' spacing='0'>
                      <Heading size='md'>{name}</Heading>
                      <Heading as='h6' size='xs'>{city}</Heading>
                    </Stack>
                    <Text>
                      Check In: {checkInTime}
                    </Text>
                    <Text>
                      Check Out: {checkOutTime}
                    </Text>
                  </Stack>
                  {state === 'active' && <Badge colorScheme='green'>Activo</Badge>}
                  {state === 'inactive' && <Badge colorScheme='red'>Inactivo</Badge>}
                  <Flex justifyContent={'end'}>
                    <strong>
                      Comision: {(Number(comision) * 100)}%
                    </strong>
                  </Flex>
                </CardBody>
                <Divider />
                <CardFooter justifyContent={'end'}>
                  <ButtonGroup spacing='2' >
                    <Tooltip hasArrow placement='top' label='Modificar' fontSize='md'>
                      <Button variant='solid' colorScheme='blue'>
                        <IconEdit width={20} height={20} fill='#fff' />
                      </Button>
                    </Tooltip>
                    <Tooltip hasArrow placement='top' label='Habitaciones' fontSize='md'>
                      <Button variant='solid' colorScheme='green'>
                        <IconRooms width={20} height={20} fill='#fff' />
                      </Button>
                    </Tooltip>
                    <Tooltip hasArrow placement='top' label='Eliminar' fontSize='md'>
                      <Button variant='solid' colorScheme='red'>
                        <IconDelete width={20} height={20} fill='#fff' />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))
        }
      </Grid >

    </>
  )
}
