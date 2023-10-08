import { Avatar, Center, Flex, Heading, Spacer, Text, Box, Button, Input } from '@chakra-ui/react';
import { BedIcon, FlyIcon, Person } from '../../icons/CustomIcons'
import { Link } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';
import './Header.css'


export default function Header() {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
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

                <ul style={{ listStyle: 'none', color:'#fff' }}>
                    <li style={{ display: 'flex', textAlign: 'center', userSelect: 'none', gap: '15px' }}>
                        <Link to={'/dashboard'} style={{ display: 'flex' }}>
                            <BedIcon width={24} height={24} fill='#fff' style={{ marginInlineEnd: '8px' }} />
                            Mis resrervas
                        </Link>
                        <Link  to={'/dashboard'} style={{ display: 'flex' }}>
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

                <Box
                    left={'50%'}
                    position={'absolute'}
                    zIndex={'100'}
                    maxWidth={'1100px'}
                    width={'calc(100% - 10px)'}
                    transform={'translate(-50%,-25px)'}
                >
                    <form style={{ margin: 0, padding: 0 }}>
                        <Flex
                            bg='secundary.0'
                            padding={'4px'}
                            borderRadius={'8px'}
                            boxShadow={'0 2px 8px 0 rgba(26,26,26,0.16)'}
                            gap={'3px'}
                        >
                            <Box bg='fontColor.white' flex={'1 1 auto'} borderRadius={'8px'}>
                                <Flex padding={'8px'} alignItems={'center'}>
                                    <BedIcon width={24} height={24} fill='#000' style={{ marginInlineEnd: '8px' }} />
                                    <Input placeholder='¿A donde vas?' width={'100%'} size='md' color={'black'} />
                                </Flex>
                            </Box>
                            <Box bg='fontColor.white' flex={'1 1 auto'} borderRadius={'8px'}>
                                <Flex padding={'8px'} alignItems={'center'} >
                                    <BedIcon width={42} height={42} fill='#000' style={{ marginInlineEnd: '8px' }} />
                                    <ReactDatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date!)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText='Fecha Inicial'
                                        calendarClassName={'width:100%'}
                                        wrapperClassName='datePicker'
                                    />
                                    <ReactDatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date!)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        placeholderText='Fecha Final'
                                        wrapperClassName='datePicker'

                                    />
                                </Flex>
                            </Box>
                            <Box bg='fontColor.white' flex={'1 1 auto'} borderRadius={'8px'}>
                                <Flex padding={'8px'} alignItems={'center'} >
                                    <Person width={24} height={24} fill='#000' style={{ marginInlineEnd: '8px' }} />
                                    <Input placeholder='Cuantas personas' width={'100%'} size='md' color={'black'} />
                                </Flex>
                            </Box>
                            <Button height={''}>Buscar</Button>
                        </Flex>
                    </form>
                </Box>

            </nav>

        </header>
    )
}
