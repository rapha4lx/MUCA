import { jwtDecode } from 'jwt-decode';


const TOKEN_KEY = 'token';

export const getUsernameFromToken = () => {
    const token = getTokenFromLocalStorage();
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
    }
    return null;
};

export const saveTokenToLocalStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const validateToken = () => {
    const token = getTokenFromLocalStorage();

    try {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);

            return typeof decodedToken.exp === 'number' && decodedToken.exp > currentTime;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};
