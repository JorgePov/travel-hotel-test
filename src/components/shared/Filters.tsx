import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { BedIcon, Person, Shcedule } from './icons/CustomIcons';
import ReactDatePicker from 'react-datepicker';
import './Filters.css'
import { useLocation } from 'react-router-dom';
import { useGlobalStorage } from '../../store/global';
import { Timestamp } from '@firebase/firestore';
import Select from 'react-select';

export const Filters = () => {
  const { fetchSearchHotels, numberTravels, municipalities } = useGlobalStorage()
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travels, setTravels] = useState<number>(numberTravels! || 1);
  const [city, setCity] = useState<string>('');
  const location = useLocation();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement
    const { city } = Object.fromEntries(new FormData(form))
    setCity(city as string);
    const newEndDate = new Date(endDate!)
    newEndDate.setHours(newEndDate.getHours() + 8);
    const newStartDate = new Date(startDate!)
    try {
      fetchSearchHotels(Timestamp.fromDate(newStartDate!), Timestamp.fromDate(newEndDate!), city as string, travels)
    } catch (error) {
      console.log(error)
    }
  }

  const maxMonths = (): Date => {
    const date = new Date()
    date.setDate(0)
    date.setMonth(date.getMonth() + 3)
    return date
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue <= 10) {
      setTravels(newValue);
    }
  };



  return (
    <>
      {location.pathname === '/dashboard' ?
        <>
          <Box padding={'48px 0px 50px 0px'} color='fontColor.white'>
            <Heading fontSize={'48px'}  >
              Planea tu próximo viaje
            </Heading>
            <Text fontSize='2xl'>Busca las mejores opciones de hoteles para tu destino.</Text>
          </Box>
          <Box
            left={'50%'}
            position={'absolute'}
            zIndex={'100'}
            maxWidth={'1100px'}
            width={'calc(100% - 10px)'}
            transform={'translate(-50%,-10px)'}
          >
            <form style={{ margin: 0, padding: 0 }} onSubmit={handleSearch}>
              <Flex
                bg='secundary.0'
                padding={'4px'}
                borderRadius={'8px'}
                boxShadow={'0 2px 8px 0 rgba(26,26,26,0.16)'}
                gap={'3px'}
              >
                <Box bg='fontColor.white' flex={'1 1 auto'} borderRadius={'8px'} w={'27%'}>
                  <Flex padding={'8px'} alignItems={'center'} >
                    <BedIcon width={24} height={24} fill='#000' style={{ marginInlineEnd: '8px' }} />
                    <Select placeholder='¿A donde vas?' name='city' options={municipalities} defaultValue={{ label: city, value: city }} className='datePicker' />
                  </Flex>
                </Box>
                <Box bg='fontColor.white' flex={'1 1 auto'} borderRadius={'8px'}>
                  <Flex padding={'8px'} alignItems={'center'} >
                    <Shcedule width={42} height={42} fill='#000' style={{ marginInlineEnd: '8px' }} />
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date!)}
                      selectsStart
                      minDate={new Date()}
                      maxDate={maxMonths()}
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
                    <Input placeholder='Cuantas personas' type='number' min={1} max={8} width={'100%'} size='md' color={'black'} value={travels} onChange={(event) => handleChange(event)} />
                  </Flex>
                </Box>
                <Button type='submit' height={''}>Buscar</Button>
              </Flex>
            </form>
          </Box>
        </>

        :
        null
      }
    </>
  )
}
