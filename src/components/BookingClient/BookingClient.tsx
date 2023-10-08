import { Button, Card, CardBody, CardFooter, Container, Heading, Image, Stack, Text, Box, Center, Flex, Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@chakra-ui/react';
import React from 'react'
import { Details } from '../shared/icons/CustomIcons';
import "./BookingClient.css";
import DeleteAlert from '../AlertDialog/DeleteAlert';

export default function BookingClient() {
    return (
        <Container maxW='container.xl' mt={4}>
            <Text fontSize='4xl' fontWeight='bold' >Reservas y viajes</Text>
            <Box mb={5}>
                <Text fontSize='2xl' fontWeight='bold' >Girardot</Text>
                <Text fontSize='sm'  >4 Jul – 6 Jul</Text>
            </Box>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                alignItems='center'
                p={'1.5rem'}
                boxShadow={'0 2px 8px 0 rgba(26,26,26,0.16)'}
                cursor={'pointer'}
                className='hoverBox'
            >
                <Stack direction='row' spacing={4}>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '80px' }}
                        maxH={{ base: '80px' }}
                        borderRadius={'0.25rem'}
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    />
                </Stack>

                <Stack direction='row' flex={'1 1 auto'} spacing={'auto'}>
                    <CardBody p={0} ml={'1.5rem'}>
                        <Heading size={'1rem'}>Hotel 1</Heading>
                        <Text mt={'2'} fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                            4 Jul – 6 Jul, Girardot
                        </Text>
                        <Text mt={'2'} fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                            Completada
                        </Text>
                    </CardBody>
                </Stack>
                <Stack direction='row' spacing={4} alignSelf={'start'}>
                    <Text mt={'2'} fontSize={'sm'} fontWeight={'bold'} lineHeight={'3'}>
                        COP 211.340
                    </Text>
                </Stack>
                <Stack direction='row' spacing={4} alignSelf={'start'} ml={4}>
                    <DeleteAlert idElement='getId' type='booking' />
                </Stack>
            </Card>
        </Container >
    )
}
