import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Select as List } from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import Select from 'react-select'
import { CustomMenuList } from '../shared/CustomMenuList'
import { useGlobalStorage } from '../../store/global'
import { hours } from '../../utils/utils';
import { Hotel } from '../../interfaces/Hotel'
import { createdHotel } from '../../services/hotelService'


type modalProps = {
  onClose: () => void,
  isOpen: boolean
}

export const CreateHotelModal = ({ onClose, isOpen }: modalProps) => {
  const [comission, setComission] = useState<number>(0)
  const fetchHotels = useGlobalStorage(state => state.fetchHotels)
  const municipalities = useGlobalStorage(state => state.municipalities)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const { address, checkInTime, checkOutTime, city, comision, name, phoneNumber } = Object.fromEntries(new FormData(form))
    const newHotel: Hotel = {
      address: address as string,
      checkInTime: `${checkInTime}:00PM` as string,
      checkOutTime: `${checkOutTime}:00AM` as string,
      city: city as string,
      comision: Number(comision) / 100,
      name: name as string,
      phoneNumber: phoneNumber as string
      , state: 'active'
    }
    try {
      await createdHotel(newHotel)
      fetchHotels()
      onClose()
    } catch (error) {
      console.log(error);
    }
  }

  const handleComission = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = event.target;
    const newValue = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setComission(newValue);
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Nuevo Hotel</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Grid >
              <GridItem colSpan={1}>
                <Stack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Nombre Hotel</FormLabel>
                    <Input name='name' type="text" />
                  </FormControl>

                  <FormControl id="city" isRequired>
                    <FormLabel>Ciudad</FormLabel>
                    <Select name='city' options={municipalities} components={{
                      MenuList: CustomMenuList,
                    }} />
                  </FormControl>

                  <FormControl id="checkInTime" isRequired>
                    <FormLabel>Check In</FormLabel>
                    <List name='checkInTime' placeholder="Seleccionar CheckIn">
                      {hours.map(val => (
                        <option key={val} value={val}>{val} PM</option>
                      ))
                      }
                    </List>
                  </FormControl>

                  <FormControl id="checkOutTime" isRequired>
                    <FormLabel>Check Out</FormLabel>
                    <List name='checkOutTime' placeholder="Seleccionar CheckOut">
                      {hours.map(val => (
                        <option key={val} value={val}>{val} AM</option>
                      ))
                      }
                    </List>
                  </FormControl>

                  <FormControl id="address" isRequired>
                    <FormLabel>Direccion</FormLabel>
                    <Input name='address' type="text" />
                  </FormControl>

                  <FormControl id="phoneNumber" isRequired>
                    <FormLabel>Telefono</FormLabel>
                    <Input name='phoneNumber' type="number" />
                  </FormControl>

                  <FormControl id="comision" isRequired>
                    <FormLabel>Comision</FormLabel>
                    <Input name='comision' type="number" min={0} max={100} value={comission} onChange={handleComission} />
                  </FormControl>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button type='submit'> Guardar</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
