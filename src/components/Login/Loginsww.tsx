import React, { useEffect } from 'react'
import { createdUser, getUsers, getUsersById, loginUser } from '../../services/userService'
import { createRoom, getRooms } from '../../services/roomService'
import { createdHotel, getHoteles, updatedHotel } from '../../services/hotelService'
import { createBooking } from '../../services/bookingService'
import { useGlobalStore } from '../../store/global'
export default function Loginww() {

    useEffect(() => {

        const ls = async () => {
            const data = await loginUser({
                email: "admin@gmail.com", password: '121212'
            })
            console.log(data);

            //const res = await fetch("http://localhost:3000/data.json")
            //const json = await res.json()
            //console.log(json)
        }

        ls()
    }, [])


    return (
        <div>Login</div>
    )
}
