/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useGlobalStorage } from '../../store/global'

export default function CreatedBooking() {
    const { roomSelected, hotelSelected, travelDate, numberTravels, focusCity, isLoading } = useGlobalStorage()
    const [contactEmergency, setContactEmergency] = useState<String>()
    const [travels, setTravels] = useState<String>()
    setContactEmergency('test')
    setTravels('test')
    const testDeploy = () => {

        console.log(roomSelected, hotelSelected, travelDate, numberTravels, focusCity, isLoading, contactEmergency, travels);
    }

    useEffect(() => {
        testDeploy()

    }, [testDeploy, travelDate])



    return (
        <div>CreatedBooking</div>
    )
}
