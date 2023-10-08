import {
    Alert,
    AlertIcon,
    CloseButton,
} from '@chakra-ui/react'
import React from 'react'
import { useGlobalStorage } from '../../store/global';

export interface AlertProps {
    status?: "success" | "error" | "info" | "warning";
    message?: string;
    isShow: boolean;
}

export default function AlertComponent() {

    const alert = useGlobalStorage(state => state.alert)
    const setShowAlert = useGlobalStorage(state => state.setShowAlert)


    const hideAlert = () => {
        setShowAlert({ isShow: false });
    };


    return (
        <div>
            {alert.isShow ? (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
                    <Alert status={alert.status} variant="left-accent" borderRadius="md" boxShadow="md">
                        <AlertIcon />
                        {alert.message}
                        <CloseButton onClick={hideAlert} />
                    </Alert>
                </div>
            ) : null}
        </div>
    )
}
