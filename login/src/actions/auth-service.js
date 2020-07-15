import { authenticate } from '../service/api-service';

let Actions = {};
Actions.Types = {
    LOGIN_USER : 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    AUTH_ERROR: 'AUTH_ERROR',
    LOGIN_LOADING: 'LOGIN_LOADING'
}

export { Actions };

let State = {};

State.getErrorMessage = (state) => { return state.auth.errorMessage;}
State.getId = (state) => { return state.auth.id;}
State.getJwt = (state) => { return state.auth.jwt;}
State.getUser = (state) => { return state.auth.usuario;}
State.isLogin = (state) => { return state.auth.isLogin;}

export {State};

export const loginUserAsync = ( loginData ) => async (dispatch) =>{
    let auth = {
        email: loginData.email,
        password: loginData.password
    }

    dispatch({
        type: Actions.Types.LOGIN_LOADING,
    });
    try{
        const response = await authenticate( auth );
        auth = {
            id: response.data.id,
            jwt: response.data.jwt,
            isLoading: false,
            errorMessage: '',
            isError: false,
            usuario: loginData.email
        };
        dispatch({
            type: Actions.Types.LOGIN_USER,
            payload: auth
        })
    }catch( error ){
        auth.isLoading = false;
        auth.isError = true;
        try{
            auth.errorMessage = error.response.data.errors[0].description;
        }catch(err){
            auth.errorMessage = 'Error de conexion, intente mas tarde';    
        }
        dispatch({
            type: Actions.Types.AUTH_ERROR,
            payload: auth
        });
    }

}

export const loginUser = (auth) => (dispatch) =>{
    dispatch({
        type: Actions.Types.LOGIN_USER,
        payload: auth
    })
}

export const loginLoading = () => (dispatch) =>{
    dispatch({
        type: Actions.Types.LOGIN_LOADING,
    });
}

export const loginError = (errorMessage) => (dispatch) =>{
    let auth = {
        isLoading : false,
        isError : true,
        errorMessage : errorMessage
    }
    dispatch({
        type: Actions.Types.AUTH_ERROR,
        payload: auth
    });
}
