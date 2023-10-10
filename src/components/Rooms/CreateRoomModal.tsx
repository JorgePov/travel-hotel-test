import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Select as List, Spinner } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useGlobalStorage } from '../../store/global'
import { Room, roomsType } from '../../interfaces/Hotel'
import { createdRoom } from '../../services/roomService'
import { useParams } from 'react-router'


type modalProps = {
  onClose: () => void,
  isOpen: boolean
}



export const CreateRoomModal = ({ onClose, isOpen }: modalProps) => {
  const [tax, setTax] = useState<number>(0)
  const fetchRooms = useGlobalStorage(state => state.fetchRooms)
  const [isLoading, setLoading] = useState(false)
  const { id } = useParams()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const form = event.target as HTMLFormElement
    const { description, numberRoom, roomType, price, ubication } = Object.fromEntries(new FormData(form))
    const newRoom: Room = {
      description: description as string,
      idHotel: id as string,
      numberRoom: numberRoom as string,
      price: Number(price),
      roomType: roomType as roomsType,
      state: 'active',
      tax: Number(tax) / 100,
      ubication: ubication as string,
    }
    try {
      await createdRoom(newRoom)
      fetchRooms(id as string)
      setLoading(false)
      onClose()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const handleTax = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = event.target;
    const newValue = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setTax(newValue);
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Nueva Habitación</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Grid >
              <GridItem colSpan={1}>
                <Stack spacing={4}>
                  <FormControl id="numberRoom" isRequired>
                    <FormLabel>Numero de habitación</FormLabel>
                    <Input name='numberRoom' type="text" />
                  </FormControl>

                  <FormControl id="roomType" isRequired>
                    <FormLabel>Tipo de habitación</FormLabel>
                    <List name='roomType' placeholder="Seleccionar Tipo de habitacion">
                      <option value='shared'>Compartida</option>
                      <option value='simple'>Sencilla</option>
                      <option value='double'>Doble</option>
                      <option value='family'>Familiar</option>
                      <option value='suit'>Suit</option>
                    </List>
                  </FormControl>

                  <FormControl id="price" isRequired>
                    <FormLabel>Precio</FormLabel>
                    <Input name='price' type="text" />
                  </FormControl>
                  <FormControl id="tax" isRequired>
                    <FormLabel>Impuesto</FormLabel>
                    <Input name='tax' type="number" min={0} max={100} value={tax} onChange={handleTax} />
                  </FormControl>
                  <FormControl id="ubication" isRequired>
                    <FormLabel>Ubicacion</FormLabel>
                    <Input name='ubication' type="text" />
                  </FormControl>
                  <FormControl id="description" isRequired>
                    <FormLabel>Descripcion</FormLabel>
                    <Input name='description' type="text" />
                  </FormControl>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            {isLoading ? (
              <Button
                colorScheme='green'
                disabled={true}
              >
                <Spinner />
              </Button>
            ) : <Button colorScheme='green' type='submit'> Guardar</Button>}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
