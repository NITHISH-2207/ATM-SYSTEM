import axios from "axios";

const API = "https://atm-system-t33e.onrender.com";

export const signup = (data) => {
    return axios.post(`${API}/signup`, data);
};

export const login = (accountNumber, pin) => {
    return axios.post(`${API}/login`, {
        accountNumber,
        pin,
    });
};


export const getBalance = async (accountNumber) => {
    return axios.get(`${API}/balance/${accountNumber}`);
};

export const deposit = async (accountNumber, amount) => {
    return axios.put(`${API}/deposit`, {
        accountNumber,
        amount,
    });
};

export const withdraw = async (accountNumber, amount) => {
    return axios.put(`${API}/withdraw`, {
        accountNumber,
        amount,
    });
};