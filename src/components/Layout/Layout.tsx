import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Flex } from '@chakra-ui/react';
import './Layout.css'

export function Layout() {
    return (
        <>
            <Flex direction={'column'} minHeight={'100vh'}>
                <Header />
                <Container maxW='1100px' flexGrow={1}>
                    <main>
                        <Outlet />
                    </main>
                </Container>
                <Footer />
            </Flex>
        </>
    );
}