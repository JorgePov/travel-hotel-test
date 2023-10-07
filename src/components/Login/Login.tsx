import React, { useEffect } from 'react'
import { createdUser, getUsers, getUsersById, loginUser } from '../../services/userService'
import { createRoom } from '../../services/roomService'
import { createdHotel } from '../../services/hotelService'
import { createBooking } from '../../services/bookingService'
export default function Login() {

    useEffect(() => {

        const ls = async () => {
            try {
                const data = await createBooking({
                    checkIn: '3:00PM',
                    checkOut: '11:00AM',
                    city: 'Girardot',
                    comision: 0.15,
                    name: 'las palmas',
                    state: 'active',
                })
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        ls()
    }, [])


    return (
        <div>Login</div>
    )
}
