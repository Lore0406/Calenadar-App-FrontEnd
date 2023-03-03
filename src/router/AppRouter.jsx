import { LoginScreen } from "../components/auth/LoginScreen"
import { CalendarScreen } from "../components/calendar/CalendarScreen"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <>
      <Router>
         <Routes>
            <Route exact="true" path="/" element={<CalendarScreen />} />
            <Route exact="true" path="/login" element={<LoginScreen />} />

            {/**Redirige al usuario desde cualquier ruta erronea a la raíz de la app */}
            <Route  path="*" element={<Navigate to="/" />} />
         </Routes>
      </Router>
    </>
  )
}


