import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';
const WALLET_KEY = 'walletAddress';

export const getUsernameFromToken = () => {
    const token = getTokenFromLocalStorage();
    if (token) {
        try {
            const decodedToken = jwtDecode<any>(token);
            return decodedToken?.sub || null;
        } catch (e) {
            return null;
        }
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

export const saveWalletToLocalStorage = (walletAddress: string) => {
    localStorage.setItem(WALLET_KEY, walletAddress);
};

export const getWalletFromLocalStorage = () => {
    return localStorage.getItem(WALLET_KEY);
};

export const removeWalletFromLocalStorage = () => {
    localStorage.removeItem(WALLET_KEY);
};

export const validateToken = () => {
    const token = getTokenFromLocalStorage();

    try {
        if (token) {
            const decodedToken = jwtDecode<any>(token);
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
