import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { showAlert } from '../components/Alerta';  
import axiosInstance from '../config/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignUp() {
  const [ nombre, setNombre ] = useState('');
  const [ usuario, setUsuario ] = useState('');
  const [ correo, setCorreo ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, usuario, correo, password].includes('')) {
      showAlert('error', 'Todos los campos son obligatorios');
      return;
    }

    if(password.length < 6) {
      showAlert('error', 'La contraseña es demasiado corta. Debe tener al menos 6 caracteres');
      return;
    }

    // Crear el usuario en la API
    try {
        const response = await axiosInstance.post('/api/register', { nombre, usuario, correo, password });
        showAlert('success', 'Usuario registrado exitosamente. Por favor, verifica tu correo electrónico.');

        // Limpiar los campos del formulario
        setNombre('');
        setUsuario('');
        setCorreo('');
        setPassword('');

    } catch (error) {
        // Verificar si hay una respuesta del servidor
        if (error.response) {
            // El servidor respondió con un código de estado diferente a 2xx
            const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            showAlert('error', errorMessage);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            showAlert('error', 'Error en el servidor. Inténtalo de nuevo más tarde.');
        } else {
            // Algo ocurrió al hacer la solicitud
            showAlert('error', 'Error al procesar la solicitud.');
        }
    }
  }

  return (
    <section className="m-0 p-0 flex min-h-screen">
      <ToastContainer />
      <div className="w-full h-screen hidden lg:block">
        <img
          src="/img/gala2.jpg"
          className="h-full w-full object-cover "
        />
      </div>
      <div className="h-screen lg:w-3/5 mx-auto flex flex-col items-center justify-center">
        <Typography variant="h2" className="font-bold mb-6">Password Cloud</Typography>
        <div className="text-center">
          <Typography variant="h4" className="font-bold mb-0">Registrate</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tus datos para registrarte.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu nombre
            </Typography>
            <Input
              size="lg"
              placeholder="nombre"
              value={nombre}
              onChange={ e => setNombre(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu usuario
            </Typography>
            <Input
              size="lg"
              placeholder="usuario"
              value={usuario}
              onChange={ e => setUsuario(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu email
            </Typography>
            <Input
              size="lg"
              placeholder="correo@email.com"
              type="email"
              value={correo}
              onChange={ e => setCorreo(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Tu constraseña
            </Typography>
            <Input
              size="lg"
              placeholder="contraseña"
              type="password"
              value={password}
              onChange={ e => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                Acepto los&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  terminos y condiciones
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <input 
              type="submit"
              value="Crear Cuenta"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
          />

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            ¿Ya tienes una cuenta?
            <Link to="/sign-in" className="text-gray-900 ml-1">Iniciar Sesion</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
