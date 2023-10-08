import { Button, Card, CardBody, CardFooter, Container, Heading, Image, Stack, Text, Box, Center } from '@chakra-ui/react';
import React from 'react'

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
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '80px' }}
                    maxH={{ base: '80px' }}
                    borderRadius={'0.25rem'}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody p={0} ml={'1.5rem'}>
                        <Heading size={'1rem'}>The perfect latte</Heading>
                        <Text mt={'2'} fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                            Caffè latte is a coffee beverage of Italian origin made with espresso
                            and steamed milk.
                        </Text>
                        <Text mt={'2'} fontSize={'sm'} fontWeight={'normal'} lineHeight={'3'}>
                            Caffè latte is a coffee beverage of Italian origin made with espresso
                            and steamed milk.
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
        </Container>
    )
}
