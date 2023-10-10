/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useGlobalStorage } from '../../store/global'

export default function CreatedBooking() {
    const { roomSelected, hotelSelected, travelDate, numberTravels, focusCity, isLoading } = useGlobalStorage()
    const [contactEmergency, setContactEmergency] = useState<String>()
    const [travels, setTravels] = useState<String>()



    return (
        <div>CreatedBooking</div>
    )
}
