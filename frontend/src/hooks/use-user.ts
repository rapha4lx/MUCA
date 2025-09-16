import { getTokenFromLocalStorage } from "../../token-utils";
import axios from "axios";
import {useEffect, useState} from "react";
import url from "./global-hook-config";

const useUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getTokenFromLocalStorage();
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`${url}/adm/users`, config);
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar servidores:', error);
            }
        };
        fetchUsers();
    }, []);

    const createUser = async (username, email, password) => {
        try {
            const token = getTokenFromLocalStorage();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const requestBody = { username, email, password };

            // Fazendo a requisição com axios
            const response = await axios.post(`${url}/adm/cad`, requestBody, config);

            // Retornar o status e dados da resposta
            return { status: response.status, data: response.data };

        } catch (error) {
            // Verifica se há uma resposta de erro com código de status
            if (error.response.status === 500) {
                // Caso seja outro tipo de erro (sem resposta do servidor, por exemplo)
                return { status: 500, message: "Usuário ou E-mail já cadastrado!"};
            }
            else if (error.response) {
                // Retorna o status do erro
                const errorData = error.response.data;
                const errorMessages = errorData.map(errorItem => errorItem.campo + ' ' + errorItem.mensagem );
                return { status: error.response.status, message: errorMessages };
            }
        }
    };

    return { createUser, users };
};

export default useUser;
