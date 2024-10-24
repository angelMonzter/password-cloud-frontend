import { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { showAlert } from '../components/Alerta';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../config/axios';

export function Password() {
    const [ correo, setCorreo ] = useState('');

    const handleSubmit = async e => {
        e.preventDefault()

        if(correo === '') {
            showAlert('error', 'El email es obligatorio');
            return;
        }


        try {
            const { data } = await axiosInstance.post('/api/password', { correo })
            showAlert('success', 'Por favor, verifica tu correo electrónico.');
            setCorreo('');

        } catch (error) {
            showAlert('error', 'El email es obligatorio');
        }
    }

    return (
        <section className="m-0 flex gap-4 min-h-screen">
            <ToastContainer />
            <div className="h-screen lg:w-3/5 mt-0 mx-auto flex flex-col items-center justify-center">
            <div className="text-center">
                <Typography variant="h2" className="font-bold mb-4">Ingresa tu email</Typography>
                <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Recupera tu acceso.</Typography>
            </div>
            <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
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
                </div>

                <input 
                    type="submit"
                    value="Recuperar"
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full mt-6"
                />

                <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                ¿Ya tienes una cuenta?
                <Link to="/sign-in" className="text-gray-900 ml-1">Iniciar Sesion</Link>
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

export default Password;
