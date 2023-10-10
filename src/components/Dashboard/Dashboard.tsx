import { Box, Flex, Spinner } from '@chakra-ui/react'
import { CardHotelsSearched } from './CardHotelsSearched'
import { useGlobalStorage } from '../../store/global'
import { useEffect } from 'react'

export default function Dashboard() {
    const { isLoading, fetchMunicipalities } = useGlobalStorage()

    useEffect(() => {
        fetchMunicipalities()
    }, [fetchMunicipalities])

    return (
        <>
            {
                isLoading ?
                    <Flex pt={'48px'} justifyContent={'center'}>
                        < Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex > :
                    <Box pt={'48px'}>
                        <CardHotelsSearched />
                    </Box>
            }
        </>

    )
}
