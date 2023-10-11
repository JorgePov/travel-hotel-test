import { FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Select as List, ModalFooter, Button, Spinner } from "@chakra-ui/react"
import { Room, roomsType } from "../../interfaces/Hotel"
import { FormEvent, useState, useEffect } from 'react';
import { useGlobalStorage } from "../../store/global";
import { useParams } from "react-router";
import { updatedRoom } from "../../services/roomService";



type modalProps = {
  onClose: () => void,
  isOpen: boolean,
  roomInfo: Room
}

export const EditRoomModal = ({ onClose, isOpen, roomInfo }: modalProps) => {
  const { id } = useParams()
  const fetchRooms = useGlobalStorage(state => state.fetchRooms)
  const [tax, setTax] = useState<number>(0)
  const [nameRoom, setNameRoom] = useState<string>('')
  const [roomType, setRoomType] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [ubication, setUbication] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (roomInfo) {
      setNameRoom(roomInfo.numberRoom)
      setPrice(roomInfo.price)
      setUbication(roomInfo.ubication)
      setDescription(roomInfo.description)
      setRoomType(roomInfo.roomType)
      setTax(Number(roomInfo.tax) * 100)
    }

  }, [roomInfo])


  const handleTax = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = event.target;
    const newValue = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setTax(newValue);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const form = event.target as HTMLFormElement
    const { description, roomType, price, ubication } = Object.fromEntries(new FormData(form))
    const newRoom: Room = {
      description: description as string,
      idHotel: id as string,
      numberRoom: roomInfo.numberRoom as string,
      price: Number(price),
      roomType: roomType as roomsType,
      state: 'active',
      tax: Number(tax) / 100,
      ubication: ubication as string,
      id: roomInfo.id,
    }
    try {
      await updatedRoom(newRoom)
      fetchRooms(id as string)
      setLoading(false)
      onClose()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modificar Habitacion</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Grid >
              <GridItem colSpan={1}>
                <Stack spacing={4}>
                  <FormControl id="numberRoom" isRequired>
                    <FormLabel>Numero de habitacion</FormLabel>
                    <Input name='numberRoom' type="text" value={nameRoom} onChange={e => setNameRoom(e.target.value)} disabled />
                  </FormControl>

                  <FormControl id="roomType" isRequired>
                    <FormLabel>Tipo de habitacion</FormLabel>
                    <List name='roomType' placeholder="Seleccionar Tipo de habitacion" value={roomType} onChange={e => setRoomType(e.target.value)}>
                      <option value='shared'>Compartida</option>
                      <option value='simple'>Sencilla</option>
                      <option value='double'>Doble</option>
                      <option value='family'>Familiar</option>
                      <option value='suit'>Suit</option>
                    </List>
                  </FormControl>

                  <FormControl id="price" isRequired>
                    <FormLabel>Precio</FormLabel>
                    <Input name='price' type="text" value={price} onChange={e => setPrice(Number(e.target.value))} />
                  </FormControl>
                  <FormControl id="tax" isRequired>
                    <FormLabel>Impuesto</FormLabel>
                    <Input name='tax' type="number" min={0} max={100} value={tax} onChange={handleTax} />
                  </FormControl>
                  <FormControl id="ubication" isRequired>
                    <FormLabel>Ubicacion</FormLabel>
                    <Input name='ubication' type="text" value={ubication} onChange={e => setUbication(e.target.value)} />
                  </FormControl>
                  <FormControl id="description" isRequired>
                    <FormLabel>Descripcion</FormLabel>
                    <Input name='description' type="text" value={description} onChange={e => setDescription(e.target.value)} />
                  </FormControl>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            {isLoading ? (
              <Button
                colorScheme='orange'
                disabled={true}
              >
                <Spinner />
              </Button>
            ) : <Button colorScheme='orange' type='submit'> Editar</Button>}

            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal >
  )
}
