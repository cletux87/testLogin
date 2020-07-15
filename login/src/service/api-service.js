import axios from 'axios';

const petition = axios.create({
    baseURL: 'http://candidates-dev.us-east-1.elasticbeanstalk.com'
})


export function authenticate(props){
    const { email, password} = props;
    return petition.post('/login', {email, password});
}

export function getAllUsers(props){
    const {jwt} = props;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + jwt,
        }
      };
    return petition.get('/users',  options);
}

export function createNewUser(props){
    const {id, jwt, email, pass, username} = props;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + jwt,
        },
        body: {
            email: email,
            password:pass,
            username:username
        }
      };
      return petition.post('/users',  options);
}

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })