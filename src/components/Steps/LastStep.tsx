import React from 'react'
import { useGlobalStorage } from '../../store/global'
import { contactProps } from '../CreatedBooking/CreatedBooking'
import { Button, Card, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { ArrowLeft, ButtonFinish } from '../shared/icons/CustomIcons'
import { infoEmail } from '../../services/emailService'
import { formatCurrency, roomTypeInvert, timestampToStringFullDate } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

export default function LastStep({ goToNext, goToPrevious }: contactProps) {
    const { fetchCreatedBooking, createDataBooking, hotelSelected, roomSelected, userInfo, isLoading } = useGlobalStorage()
    const navigate = useNavigate()

    const handleGoToNext = async () => {
        let emailsTravels = ''
        if (createDataBooking.travels) {
            const emails = createDataBooking.travels.map(objeto => objeto.email);
            emailsTravels = emails.join(", ");

        }
        const dataEmail: infoEmail = {
            emailTo: userInfo?.email!,
            otherEmail: emailsTravels,
            hotelName: hotelSelected?.name!,
            startTravel: timestampToStringFullDate(createDataBooking.startTravel!),
            finishTravel: timestampToStringFullDate(createDataBooking.finishTravel!),
            numberRoom: roomSelected?.numberRoom!,
            roomType: `Habitacion ${roomTypeInvert[roomSelected?.roomType!]}`,
            totalPrice: formatCurrency(createDataBooking.billing?.total!),
        };
        await fetchCreatedBooking(dataEmail).then(r => {
            navigate('/dashboard/myreservations')
        });
    }
    return (
        <>
            {isLoading ?
                <Flex m={5} justifyContent={'center'}>
                    < Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Flex > :
                <>
                    <Flex justifyContent={'center'} my={5}>
                        <Card variant={'elevated'} py={5} w={'65%'}>
                            <Flex justifyContent={'center'} my={5}>
                                <Image objectFit={'cover'} src='https://ci4.googleusercontent.com/proxy/VsHscutCsnYKfLWZnS2w4RfTKsPGmjqr8VrhweeX3wzYaIDBZdqauBqDYxtvUYenf0X00P_AeNLKL4XdgdR56BASqh4X5wmhZsAEMefCb57yDkpphUN8GnOokKy3wozAvYdBrdVkSg6UXmN4dPQLUDjE7qfbEJ5t1HCk-f2iE7liKM3GXiF5iyjgAqH_fk_aiBqEZMbh3f-wThSlJB_EmQUaw9tjKhpE2pYBjmQFzHInawYMYhc5WAtkh4IjsAWIDmraqsFk1FORdluUPD7Kod79N0T5U1zzfWUNNIfMWZ7nmbop63vd8CJ-QqdDhZ-eTL6eWelq_nPUgU6Mpm4L7Fpb445KZgJk5Bz_odCM88sEensNvYTBqYAyEQnjnd9Uz5LqbcXKPRXpx--GQ8xJA6w0iEVBm42Ddn8XEm0Zv6jDLKJfuaVXbujYxd-HuXhDkuVc8cUuT04wN972TvtxUpQLT_S1rzmZ_GnaAWrbHlvXyQmWczKMW7XG2vgBuP58siQh4f5JXO4YEQ=s0-d-e1-ft#https://cijijea.r.bh.d.sendibt3.com/im/2898940/536a87a1a70bc7f4bacf3ebd24d23a215a2419541000259d34e387f9c6b963cc.png?e=FWZ2LXECU0coTK6u4NCmqerVyfATPBaGsesgDy1y3bmzNwwDgpMXevFfWGerKXXi2Udvo5JOqkbLQTykcLUT_dIhe4wefibGgiOGsxdjgiMDc2DQRTI7p48ZOEGHxj8PyAAlUa1bjSOYA97v4SgjUvIO3Euml4DGMl7TW9cf4dQcCZUpj7Jtn08nKxrsqNz1raTFCb6Tr9-R15tto7fopQI02VYCOrPBxho3ILlJ-2Y6f4bKQz-X6Lvu6PL9IZi1' />

                            </Flex>
                            <Text textAlign={'center'} fontSize={'xl'} fontWeight={"bold"}>Hemos casi terminado el proceso de reserva. </Text>
                            <Text textAlign={'center'} fontSize={'xl'} fontWeight={"bold"}>Si no planeas realizar más modificaciones has click en 'Finalizar' </Text>
                        </Card>
                    </Flex>
                    <Flex justifyContent={'space-around'}>
                        <Button colorScheme='blue' onClick={goToPrevious}>
                            <ArrowLeft width={24} height={24} fill='white' />
                            Anterior
                        </Button>
                        <Button colorScheme='green' onClick={handleGoToNext}>
                            Finalizar <ButtonFinish width={18} height={18} fill='none' />
                        </Button>
                    </Flex>
                </>
            }
        </>

    )
}
