import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom"; // Importa useParams para capturar el token de la URL
import { showAlert } from '../components/Alerta';  // Importar la función
import axiosInstance from '../config/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function PasswordRecobery() {
  const [password, setPassword] = useState('');
  const [passsword_confirmar, setConfirmarPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(null); // Estado para verificar si el token es válido
  const [passwordActualizada, setPasswordActualizada] = useState(false); // Estado para verificar si la contraseña fue actualizada
  const { token } = useParams(); // Captura el token desde la URL

  // Verificación del token en el primer render
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/api/password/${token}`;
        const { data } = await axiosInstance(url);

        // Si el token es válido
        if (data.success) {
          setTokenValido(true); // Activa el estado para mostrar el formulario
        } else {
          setTokenValido(false); // Activa el estado para mostrar el mensaje de error
          showAlert('error', 'Error al verificar el token');
        }
      } catch (error) {
        setTokenValido(false); // Si hay un error en la solicitud, también mostrar el mensaje de error
        showAlert('error', 'Problema con el enlace de recuperar contraseña');
      }
    };

    comprobarToken();
  }, [token]); // Ejecutar el efecto cada vez que el token cambie

  // Manejo del formulario de actualización de contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      showAlert('error', 'La contraseña debe ser mínimo de 6 caracteres');
      return;
    }

    try {
      const { data } = await axiosInstance.put('/api/update-password', { password, passsword_confirmar, token });

      // Si la contraseña se actualizó con éxito
      if (data.success) {
        showAlert('success', data.message); // Mostrar mensaje de éxito
        setPassword(''); // Limpiar inputs
        setConfirmarPassword('');
        setPasswordActualizada(true); // Indicar que la contraseña fue actualizada
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showAlert('error', 'Las contraseñas no coinciden'); // Mostrar mensaje de error
      } else {
        showAlert('error', 'La contraseña no se pudo actualizar'); // Mostrar mensaje de error genérico
      }
      setPasswordActualizada(false); // Asegurar que no se ocultan los inputs en caso de error
    }
  };

  return (
    <section className="p-0 flex min-h-screen">
      <ToastContainer />
      <div className="w-full w-2/5 h-screen hidden lg:block">
        <img
          src="/img/gala2.jpg"
          className="h-full w-full object-cover "
        />
      </div>
      <div className="h-screen lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Recuperar contraseña</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Ingresa tu nueva contraseña.</Typography>
        </div>

        {/* Mostrar el mensaje de éxito si la contraseña ha sido actualizada */}
        {passwordActualizada ? (
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Contraseña actualizada exitosamente.
          </Typography>
        ) : (
          <>
            {/* Mostrar "Verificando enlace..." mientras se verifica el token */}
            {tokenValido === null && (
              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Verificando enlace...
              </Typography>
            )}

            {/* Mostrar el formulario solo si el token es válido */}
            {tokenValido === true && (
              <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Tu nueva contraseña
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="contraseña"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Confirma tu nueva constraseña
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="confirmar contraseña"
                    type="password"
                    value={passsword_confirmar}
                    onChange={e => setConfirmarPassword(e.target.value)}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>
                <input
                  type="submit"
                  value="Guardar"
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
                />
              </form>
            )}

            {/* Mostrar mensaje de error si el token no es válido */}
            {tokenValido === false && (
              <Typography variant="paragraph" className="text-center text-red-500 font-medium mt-4">
                Error al generar nueva contraseña. Vuelve a intentarlo
              </Typography>
            )}
          </>
        )}

        <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
          ¿Ya tienes una cuenta?
          <Link to="/sign-in" className="text-gray-900 ml-1">Iniciar Sesion</Link>
        </Typography>
      </div>
    </section>
  );
}

export default PasswordRecobery;
