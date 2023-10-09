import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '../shared/icons/CustomIcons';
import { useEffect } from 'react';
import { useGlobalStorage } from '../../store/global';
import { useParams } from 'react-router';
import { CardsRoomsComponent } from './CardsRoomsComponent';
import { CreateRoomModal } from './CreateRoomModal';

export default function DashboardRoom() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const fetchRooms = useGlobalStorage(state => state.fetchRooms)
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            fetchRooms(id)
        }
    }, [fetchRooms])

    return (
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
    )
}
