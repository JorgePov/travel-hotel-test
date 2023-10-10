import { Box, Button, Flex, Spinner, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '../shared/icons/CustomIcons';
import { useEffect } from 'react';
import { useGlobalStorage } from '../../store/global';
import { useParams } from 'react-router';
import { CardsRoomsClientComponent } from './CardsRoomsClientComponent';
export default function RoomClient() {
    const { fetchRoomsClient, isLoading } = useGlobalStorage()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            fetchRoomsClient(id)
        }
    }, [fetchRoomsClient, id])

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
                    <Box>
                        <CardsRoomsClientComponent />
                    </Box>
            }
        </>
    )
}
