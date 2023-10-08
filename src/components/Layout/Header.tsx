import { Avatar, Center, Flex, Heading, Spacer, Text, Box, Container } from '@chakra-ui/react';
import { Filters } from '../shared/Filters';
import { Navlinks } from '../shared/Navlinks';


export default function Header() {


    return (
        <header style={{ background: '#003b95', padding: '8px 0px 8px 0px' }}>
            <Container maxW='1100px' pb={4}>
                <nav >
                    <Flex justifyContent={'center'} alignItems={'center'} padding={'8px 0px 16px 0px'} >
                        <Center>
                            <Heading color='fontColor.white' fontSize={'1.5rem'}>Booking</Heading>
                        </Center>
                        <Spacer />
                        <Avatar size={'sm'} />
                    </Flex>
                    <Navlinks />
                </nav>
                <Filters />
            </Container>
        </header>
    )
}
