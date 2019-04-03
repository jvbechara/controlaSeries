// const mongoose = require('mongoose');

// mongoose.connect('mongodb://jvbechara:crvg1995@ds018258.mlab.com:18258/controlaseries', {useNewUrlParser: true});

// var series = mongoose.model('series');

// export default series;

import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({baseURL: 'http://localhost:3001'});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.genericflix_token = `${token}`;
    }
    return config;
});
  

export default api;