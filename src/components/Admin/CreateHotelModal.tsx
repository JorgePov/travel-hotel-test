import { Button, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react'
import { FormEvent } from 'react'
import Select from 'react-select'
import { CustomMenuList } from '../shared/CustomMenuList'
import { useGlobalStorage } from '../../store/global'


type modalProps = {
  onClose: () => void,
  isOpen: boolean
}

export const CreateHotelModal = ({ onClose, isOpen }: modalProps) => {
  const municipalities = useGlobalStorage(state => state.municipalities)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form))
    console.log(data);
    
    //onClose()
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
                    <Input name='hotelName' type="text" />
                  </FormControl>

                  <FormControl id="city" isRequired>
                    <FormLabel>Ciudad</FormLabel>
                    <Select name='city' options={municipalities} components={{
                      MenuList: CustomMenuList,
                    }} />
                  </FormControl>

                  <FormControl id="checkInTime" isRequired>
                    <FormLabel>Check In</FormLabel>
                  </FormControl>

                  <FormControl id="checkOutTime" isRequired>
                    <FormLabel>Check Out</FormLabel>
                    <Input name='checkOutTime' type="datetime-local" />
                  </FormControl>

                  <FormControl id="adress" isRequired>
                    <FormLabel>Direccion</FormLabel>
                    <Input name='adress' type="text" />
                  </FormControl>

                  <FormControl id="phone" isRequired>
                    <FormLabel>Telefono</FormLabel>
                    <Input name='phone' type="text" />
                  </FormControl>

                  <FormControl id="comision" isRequired>
                    <FormLabel>Comision</FormLabel>
                    <Input name='comision' type="text" />
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
