import Axios from 'axios';


export const axios = Axios.create({ 
    baseURL: "/api/",
    headers : {'X-Custom-Header' : 'foobar'},
    timeout: 3000
})
