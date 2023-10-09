import { ChakraProvider, CSSReset} from '@chakra-ui/react';
import theme from "./theme";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import { Layout } from "./components/Layout/Layout";
import { useGlobalStorage } from "./store/global";
import AlertComponent from "./components/Alert/AlertComponent";
import Register from "./components/Register/Register";
import 'react-datepicker/dist/react-datepicker.css'
import DashboardAdmin from "./components/Admin/DashboardAdmin";
import BookingClient from "./components/BookingClient/BookingClient";
import Room from "./components/Rooms/Room";
import { DetailsBooking } from "./components/DetailsBooking/DetailsBooking";

export function App() {
  const isAuth = useGlobalStorage(state => state.isAuth)


  return (
    <ChakraProvider theme={theme} >
      <CSSReset />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute redirectTo="/login" canActived={isAuth} />} >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/admin/:id" element={<Room />} />
              <Route path="/dashboard/myreservations" element={<BookingClient />} />
              <Route path="/dashboard/myreservations/:id" element={<DetailsBooking />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AlertComponent />
    </ChakraProvider >

  )
}
