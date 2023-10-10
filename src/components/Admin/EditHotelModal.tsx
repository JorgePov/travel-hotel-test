import { FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Select, ModalFooter, Button, Spinner } from "@chakra-ui/react"
import { Hotel } from "../../interfaces/Hotel"
import { hours } from "../../utils/utils"
import { FormEvent, useState, useEffect } from 'react';
import { updatedHotel } from "../../services/hotelService";
import { useGlobalStorage } from "../../store/global";



type modalProps = {
  onClose: () => void,
  isOpen: boolean,
  hotelInfo: Hotel
}

export const EditHotelModal = ({ onClose, isOpen, hotelInfo }: modalProps) => {
  const fetchHotels = useGlobalStorage(state => state.fetchHotels)
  const [comission, setComission] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [checkIn, setCheckIn] = useState<number>(0)
  const [checkOut, setCheckOut] = useState<number>(0)
  const [phone, setPhone] = useState<number>(0)
  const [isLoading, setLoading] = useState(false)


  useEffect(() => {
    if (hotelInfo) {
      setName(hotelInfo.name)
      setCheckIn(Number(hotelInfo.checkInTime.split(':')[0]))
      setCheckOut(Number(hotelInfo.checkOutTime.split(':')[0]))
      setPhone(Number(hotelInfo.phoneNumber))
      setComission(Number(hotelInfo.comision) * 100)
    }

  }, [hotelInfo])


  const handleComission = (event: React.ChangeEvent<HTMLInputElement>) => {

    let { value, min, max } = event.target;
    const newValue = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setComission(newValue);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const form = event.target as HTMLFormElement
    const { checkInTime, checkOutTime, comision, phoneNumber } = Object.fromEntries(new FormData(form))
    const newHotel: Hotel = {
      id: hotelInfo.id,
      address: hotelInfo.address,
      checkInTime: `${checkInTime}:00PM` as string,
      checkOutTime: `${checkOutTime}:00AM` as string,
      city: hotelInfo.city,
      comision: Number(comision) / 100,
      name: hotelInfo.name,
      phoneNumber: phoneNumber as string,
      state: hotelInfo.state,
      idImage: hotelInfo.idImage
    }
    try {
      await updatedHotel(newHotel)
      fetchHotels()
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
        <ModalHeader>Modificar Hotel</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Grid >
              <GridItem colSpan={1}>
                <Stack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Nombre Hotel</FormLabel>
                    <Input name='name' type="text" disabled value={name} onChange={e => setName(e.target.value)} />
                  </FormControl>

                  <FormControl id="checkInTime" isRequired>
                    <FormLabel>Check In</FormLabel>
                    <Select name='checkInTime' placeholder="Seleccionar CheckIn" value={checkIn}
                      onChange={e => setCheckIn(Number(e.target.value))} >
                      {hours.map(val => (
                        <option key={val} value={val}>{val} PM</option>
                      ))
                      }
                    </Select>
                  </FormControl>

                  <FormControl id="checkOutTime" isRequired>
                    <FormLabel>Check Out</FormLabel>
                    <Select name='checkOutTime' placeholder="Seleccionar CheckOut" value={checkOut}
                      onChange={e => setCheckOut(Number(e.target.value))}>
                      {hours.map(val => (
                        <option key={val} value={val}>{val} AM</option>
                      ))
                      }
                    </Select>
                  </FormControl>

                  <FormControl id="phoneNumber" isRequired>
                    <FormLabel>Telefono</FormLabel>
                    <Input name='phoneNumber' type="number" value={phone} onChange={e => setPhone(Number(e.target.value))} />
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
