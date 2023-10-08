import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@chakra-ui/react";

export function Layout() {
    return (
        <>
            <Header />
            <Container maxW='1100px'>
                <main>
                    <Outlet />
                </main>
            </Container>
            <Footer />
        </>
    );
}