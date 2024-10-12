import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { showAlert } from '../components/Alerta';  
import axiosInstance from '../config/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignIn() {

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();

      if([correo, password].includes('')) {
          showAlert('error', 'Todos los campos son obligatorios');
          return 
      }

      try {
          const { data } = await axiosInstance.post('/api/login', {correo, password});
          localStorage.setItem('token', data.token);
          setAuth(data)
          navigate('/profile');
      } catch (error) {
          // El servidor respondió con un código de estado diferente a 2xx
          const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
          showAlert('error', errorMessage);
      }
  }

  return (
    <section className="m-0 flex gap-4 min-h-screen">
      <ToastContainer />
      <div className="h-screen lg:w-3/5 mt-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Iniciar Sesión</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu email y contraseña para iniciar sesion.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu email
            </Typography>
            <Input
              size="lg"
              placeholder="correo@email.com"
              type="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={correo}
              onChange={e => setCorreo(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu contraseña
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Link to="/password" className="flex items-center text-center justify-start font-normal text-blue-gray-500 mt-4">
          ¿Olvidaste tu contraseña?
          </Link>
          
          <input 
              type="submit"
              value="Iniciar"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
          />

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿No estas registrado?
            <Link to="/sign-up" className="text-gray-900 ml-1">Crea una cuenta</Link>
          </Typography>
        </form>

      </div>
      <div className="w-full w-2/5 h-screen hidden lg:block">
        <img
          src="/img/gala1.jpg"
          className="h-full w-full object-cover "
        />
      </div>

    </section>
  );
}

export default SignIn;
