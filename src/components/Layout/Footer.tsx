import { Box, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { GithubIcon, LinkedinIcon } from '../shared/icons/CustomIcons'

export default function Footer() {
    return (
        <Box as='footer' width={'100%'} height={'40px'} bg={'primary.200'} color={'white'} mt={2}>
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
        </Box>
    )
}
