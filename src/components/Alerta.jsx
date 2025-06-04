import { toast } from "react-toastify";

export const showAlert = (type, message, onConfirm = null) => {
  const options = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type === "confirm" && onConfirm) {
    toast(
      ({ closeToast }) => (
        <div>
          <p>{message}</p>
          <div className="flex gap-2 mt-2">
            <button
              className="text-white px-3 py-1 mr-2 rounded"
              onClick={() => {
                onConfirm(); // Llama a la función de confirmación
                toast.success("Acción realizada con éxito", options);
                closeToast();
              }}
              style={{ border: "0px", backgroundColor:"green"}}
            >
              Sí
            </button>
            <button
              className="text-white px-3 py-1 rounded"
              onClick={closeToast}
              style={{ border: "0px", backgroundColor:"red"}}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
    return;
  }

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
