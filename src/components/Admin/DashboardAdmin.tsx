import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '../shared/icons/CustomIcons';
import { CreateHotelModal } from './CreateHotelModal';
import { useEffect } from 'react';
import { useGlobalStorage } from '../../store/global';
import { CardsHotelComponent } from './CardsHotelComponent';

export default function DashboardAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const fetchHotels = useGlobalStorage(state => state.fetchHotels)
    const fetchMunicipalities = useGlobalStorage(state => state.fetchMunicipalities)

    useEffect(() => {
        fetchHotels()
        fetchMunicipalities()
    }, [fetchHotels, fetchMunicipalities])

    //Save hotel Method

    return (
        <section style={{ paddingTop: '48px' }}>
            {/* crear horel */}
            <Flex justifyContent={'center'} alignItems={'center'} paddingBottom={'30px'}>
                <Button colorScheme='teal' variant='outline' maxWidth={'350px'} width={'100%'} onClick={onOpen}>
                    <IconPlus width={20} height={20} fill='#2C7A7B' />
                    Agregar Hotel
                </Button>
            </Flex>
            {/* Hoteles creados */}
            <CardsHotelComponent />
            <CreateHotelModal isOpen={isOpen} onClose={onClose} />
        </section>
    )
}
