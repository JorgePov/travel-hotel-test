import { Button, Flex, Spinner, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '../shared/icons/CustomIcons';
import { useEffect } from 'react';
import { useGlobalStorage } from '../../store/global';
import { useParams } from 'react-router';
import { CardsRoomsComponent } from './CardsRoomsComponent';
import { CreateRoomModal } from './CreateRoomModal';

export default function DashboardRoom() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { fetchRooms, isLoading } = useGlobalStorage()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            fetchRooms(id)
        }
    }, [fetchRooms, id])

    return (
        <>
            {
                isLoading ?
                    <Flex m={5} justifyContent={'center'}>
                        < Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex> :
                    <section style={{ paddingTop: '48px' }}>
                        <Flex justifyContent={'center'} alignItems={'center'} paddingBottom={'30px'}>
                            <Button colorScheme='teal' variant='outline' maxWidth={'350px'} width={'100%'} onClick={onOpen}>
                                <IconPlus width={20} height={20} fill='#2C7A7B' />
                                Agregar Habitacion
                            </Button>
                        </Flex>
                        <CardsRoomsComponent />
                        <CreateRoomModal isOpen={isOpen} onClose={onClose} />
                    </section>
            }
        </>
    )
}
