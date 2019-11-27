import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

export default axios
