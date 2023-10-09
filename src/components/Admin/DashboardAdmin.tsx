import { Button, Flex, Spinner, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '../shared/icons/CustomIcons';
import { CreateHotelModal } from './CreateHotelModal';
import { useEffect } from 'react';
import { useGlobalStorage } from '../../store/global';
import { CardsHotelComponent } from './CardsHotelComponent';

export default function DashboardAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { fetchHotels, isLoading, fetchMunicipalities } = useGlobalStorage()

    useEffect(() => {
        fetchHotels()
        fetchMunicipalities()
    }, [fetchHotels, fetchMunicipalities])

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
                                Agregar Hotel
                            </Button>
                        </Flex>
                        <CardsHotelComponent />
                        <CreateHotelModal isOpen={isOpen} onClose={onClose} />
                    </section>
            }
        </>
    )
}
