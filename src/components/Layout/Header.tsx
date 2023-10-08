import { Avatar, Center, Flex, Heading, Spacer, Text, Box } from '@chakra-ui/react';
import { BedIcon, FlyIcon } from '../shared/icons/CustomIcons'
import { Link } from 'react-router-dom'

import { Filters } from '../shared/Filters';


export default function Header() {

    return (
        <header style={{ background: '#003b95', padding: '8px 0px 8px 0px' }}>
            <nav style={{ margin: '0 auto', maxWidth: '1000px' }}>
                <Flex justifyContent={'center'} alignItems={'center'} padding={'8px 0px 16px 0px'} >
                    <Center>
                        <Heading color='fontColor.white' fontSize={'1.5rem'}>Booking</Heading>
                    </Center>
                    <Spacer />
                    <Avatar size={'sm'} />
                </Flex>

                <ul style={{ listStyle: 'none', color: '#fff' }}>
                    <li style={{ display: 'flex', textAlign: 'center', userSelect: 'none', gap: '15px' }}>
                        <Link to={'/dashboard'} style={{ display: 'flex' }}>
                            <BedIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                            Mis resrervas
                        </Link>
                        <Link to={'/dashboard'} style={{ display: 'flex' }}>
                            <FlyIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                            Reservar
                        </Link>
                    </li>
                </ul>
                <Box padding={'48px 0px 50px 0px'} color='fontColor.white'>
                    <Heading fontSize={'48px'}  >
                        Encuentra tu próxima estancia
                    </Heading>
                    <Text fontSize='2xl'>Busca ofertas en hoteles, casas y mucho más...</Text>
                </Box>
            </nav>
            <Filters />
        </header>
    )
}
