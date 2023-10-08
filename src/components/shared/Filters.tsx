import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BedIcon, Person, Shcedule } from './icons/CustomIcons';
import ReactDatePicker from 'react-datepicker';
import './Filters.css'
import { useGlobalStorage } from '../../store/global';

export const Filters = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const isadmin = useGlobalStorage(state => state.isAdmin)

  return (
    <>
      {!isadmin ?
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
                  <Shcedule width={42} height={42} fill='#000' style={{ marginInlineEnd: '8px' }} />
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
        :
        null
      }
    </>
  )
}
