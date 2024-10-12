import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../config/axios';

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/api/confirmar/${token}`;
                const { data } = await axiosInstance(url);

                // Suponiendo que el backend devuelve algo como { success: true, message: '...' }
                if (data.success) {
                    setCuentaConfirmada(true);
                    setMensaje(data.message || 'Cuenta confirmada exitosamente');
                } else {
                    setCuentaConfirmada(false);
                    setMensaje(data.message || 'Error al confirmar la cuenta');
                }
            } catch (error) {
                setCuentaConfirmada(false);
                setMensaje('Error al confirmar la cuenta');
            }
        };

        confirmarCuenta();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-1/2 bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-black font-black text-4xl text-center mb-4">
                    {cuentaConfirmada ? 'Cuenta confirmada' : 'Error al confirmar'}
                </h1>
                <p className={`text-center ${cuentaConfirmada ? 'text-green-600' : 'text-red-600'}`}>
                    {mensaje}
                </p>
                {cuentaConfirmada && (
                    <div className="flex justify-center">
                        <Link
                            className="text-center w-1/2 mt-3 align-middle select-none font-sans font-bold  uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full "
                            to="/sign-in"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmarCuenta;
