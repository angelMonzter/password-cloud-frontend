import { useContext } from "react";
import AcountContext from "../context/AcountProvider";

const useAcount = () => {
    return useContext(AcountContext);
}

export default useAcount;