import React, { useEffect } from 'react'
import { createdUser, getUsers, getUsersById, loginUser } from '../../services/userService'
import { createRoom } from '../../services/roomService'
import { createdHotel, getHoteles, updatedHotel } from '../../services/hotelService'
import { createBooking } from '../../services/bookingService'
export default function Login() {

    useEffect(() => {

        const ls = async () => {
            const data = await updatedHotel(
                {
                    checkInTime
                        :
                        "3:00PM",
                    checkOutTime
                        :
                        "11:00AM",
                    city
                        :
                        "Girardot",
                    comision
                        :
                        0.15,
                    id
                        :
                        "MVQg6dJKZKe4mTgO3y5U",
                    name
                        :
                        "Tocarema v2",
                    state
                        :
                        "active",
                }
            ).then(r => console.log(r))
        }

        ls()
    }, [])


    return (
        <div>Login</div>
    )
}
