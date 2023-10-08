import * as React from "react"
import { ChakraProvider, CSSReset, } from '@chakra-ui/react';
import theme from "./theme";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Hotel from "./components/Hotels/Hotel";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";

export const App = () => (
  <ChakraProvider theme={theme} >
    <CSSReset />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </ChakraProvider >
)
