import { Box, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { GithubIcon, LinkedinIcon } from '../shared/icons/CustomIcons'

export default function Footer() {
    return (
        <footer style={{ position: 'fixed', width: '100%', height: '40px', bottom: 0, background: '#003b95', color: 'white' }}>
            <Flex alignItems={'center'} justifyContent={'center'} height={'100%'} gap={3}>
                <Box>
                    Desarrollado por : Jorge Poveda
                </Box>
                <Link href='https://github.com/JorgePov/travel-hotel-test' target='_blank' rel='noreferrer'>
                    <GithubIcon fill='#fff' width={20} height={20} />
                </Link>
                <Link href='https://www.linkedin.com/in/jorge-poveda/' target='_blank' rel='noreferrer'>
                    <LinkedinIcon fill='#fff' width={20} height={20} />
                </Link>
            </Flex>
        </footer>
    )
}
