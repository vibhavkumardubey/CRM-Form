import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyContext = createContext();

const MyContextProvider = (props) => {
    const navigate = useNavigate();
    const [singleFormData, setSingleFormData] = useState();

    const getSingleFormData = (id) => {

        if (!id) {
            console.error("Invalid form ID:", id);
            return;
        }

        axios
            .get('$http://192.168.1.12:7000/api/admin/form/${id}', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log(result);
                setSingleFormData(result?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const value = {
        navigate,
        getSingleFormData,
        singleFormData,
    };

    return (
        <MyContext.Provider value={value}>
            {props.children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
