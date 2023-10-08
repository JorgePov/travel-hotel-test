import React, { useEffect } from 'react'
import { createdUser, getUsers, getUsersById, loginUser } from '../../services/userService'
import { createRoom, getRooms } from '../../services/roomService'
import { createdHotel, getHoteles, updatedHotel } from '../../services/hotelService'
import { createBooking } from '../../services/bookingService'
import { useGlobalStorage } from '../../store/global'
export default function Loginww() {
    const setUser = useGlobalStorage(state => state.setUserInfo)
    useEffect(() => {

        const ls = async () => {
            const data = await loginUser({
                email: "admin@gmail.com", password: '121212'
            })
            setUser(data)
        }

        ls()
    }, [setUser])


    return (
        <div>Login</div>
    )
}
