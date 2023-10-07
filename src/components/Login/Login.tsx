import React, { useEffect } from 'react'
import { createdUser, getUsers, getUsersById, loginUser } from '../../services/userService'
import { createdHotel } from '../../services/roomService'
export default function Login() {

    useEffect(() => {

        const ls = async () => {
            try {
                const data = await createdHotel({
                    checkIn: '3:00PM',
                    checkOut: '11:00AM',
                    city: 'Girardot',
                    comision: 0.15,
                    name: 'tocarema',
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
