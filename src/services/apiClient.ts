import axios from 'axios';

export default (headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
}) =>
    axios.create({
        timeout: 30000,
        headers,
        responseType: 'json',
        withCredentials: true,
        baseURL: 'http://localhost:8080/api',
    });

