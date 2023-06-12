
import axios from 'axios';
import { obtenerVariablesEnt } from './../helpers/obtenerVariablesEnt';

const { VITE_API_URL } = obtenerVariablesEnt();
console.log(VITE_API_URL)

// Creamos la instancia de axios
const calendarioApi = axios.create({
    baseURL: 'http://localhost:4000/api',
});

// todo: configuramos los interceptores de axios

export default calendarioApi;

