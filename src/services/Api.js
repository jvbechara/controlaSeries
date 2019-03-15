// const mongoose = require('mongoose');

// mongoose.connect('mongodb://jvbechara:crvg1995@ds018258.mlab.com:18258/controlaseries', {useNewUrlParser: true});

// var series = mongoose.model('series');

// export default series;

import axios from 'axios';

const api = axios.create({baseURL: 'http://localhost:3001'});

export default api;