import { getAllUsers, createNewUser } from '../service/api-service';
import { loginUser } from '../actions/auth-service'; 

let Actions = {};

Actions.Types = {
    CREATE_USER : 'CREATE_USER',
    LOADING_CREATE_USER: 'LOADING_CREATE_USER',
    ERROR_CREATE_USER: 'ERROR_CREATE_USER',
    LOADING_FETCH_USER: 'LOADING_FETCH_USER',
    FETCH_USERS: 'FETCH_USERS',
    ERROR_FETCH_USER: 'ERROR_FETCH_USER'
}

export { Actions };

let State = {};

State.getUsers = (state) => {return state.users.userList}
State.isLoading = (state) => {return state.users.isLoading}
State.isError = (state) => {return state.users.isError}

export {State};

export const createUser = (id, jwt, username, email, pass) => async (dispatch) =>{
    let conf = {
        id: id,
        jwt: jwt,
        username: username,
        email: email,
        pass:pass
    }

    dispatch({
        type: Actions.Types.LOADING_CREATE_USER,
    });
    try{
        const response = await createNewUser( conf );
        let auth = {
            id: response.data.id,
            jwt: response.data.jwt,
            isLoading: false,
            errorMessage: '',
            isError: false,
        };
        loginUser( auth );
        dispatch({
            type: Actions.Types.CREATE_USER
        })
    }catch( error ){
        conf.isLoading = false;
        conf.isError = true;
        try{
            conf.errorMessage = error.response.data.errors[0].description;
        }catch(err){
            conf.errorMessage = 'Error al crear usuario';    
        }
        dispatch({
            type: Actions.Types.ERROR_CREATE_USER,
            payload: conf
        })
        
    }

}


export const fetchUsers = (id, jwt) => async (dispatch) =>{
    let conf = {
        id: id,
        jwt: jwt
    }

    dispatch({
        type: Actions.Types.LOADING_FETCH_USER,
    });
    try{
        const response = await getAllUsers( conf );
        dispatch({
            type: Actions.Types.FETCH_USERS,
            payload: response.data.users
        })
    }catch( error ){
        conf.isLoading = false;
        conf.isError = true;
        try{
            conf.errorMessage = error.response.data.errors[0].description;
        }catch(err){
            conf.errorMessage = 'Error al conseguir los datos';    
        }
        dispatch({
            type: Actions.Types.ERROR_FETCH_USER,
            payload: conf
        })
        
    }

}