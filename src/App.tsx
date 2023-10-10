import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from "./theme";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import { Layout } from "./components/Layout/Layout";
import { useGlobalStorage } from "./store/global";
import AlertComponent from "./components/Alert/AlertComponent";
import Register from "./components/Register/Register";
import 'react-datepicker/dist/react-datepicker.css'
import DashboardAdmin from "./components/Admin/DashboardAdmin";
import BookingClient from "./components/BookingClient/BookingClient";
import { DetailsBooking } from "./components/DetailsBooking/DetailsBooking";
import BookingAdmin from "./components/BookingAdmin/BookingAdmin";
import DashboardRoom from './components/Rooms/DashboardRoom';
import Dashboard from './components/Dashboard/Dashboard';
import RoomClient from './components/RoomClient/RoomClient';
import CreatedBooking from './components/CreatedBooking/CreatedBooking';

export function App() {
  const isAuth = useGlobalStorage(state => state.isAuth)

  return (
    <ChakraProvider theme={theme} >
      <CSSReset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute redirectTo="/login" canActived={isAuth} />} >
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/admin/:id" element={<DashboardRoom />} />
              <Route path="/admin/reservations" element={<BookingAdmin />} />
              <Route path="/admin/reservations/:id" element={<DetailsBooking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<RoomClient />} />
              <Route path="/dashboard/myreservations" element={<BookingClient />} />
              <Route path="/dashboard/myreservations/:id" element={<DetailsBooking />} />
              <Route path="/booking" element={<CreatedBooking />} />
              <Route path="/booking/:id" element={<CreatedBooking />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AlertComponent />
    </ChakraProvider >

  )
}
