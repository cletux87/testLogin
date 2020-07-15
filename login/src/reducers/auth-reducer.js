import * as AuthServives from '../actions/auth-service';

const INITIAL_STATE = {
    id: '',
    jwt: '',
    usuario:'',
    isLoading: false,
    isError: false,
    errorMessage: '',
    isLogin: false
};

export default ( state = INITIAL_STATE, action ) =>{
    switch( action.type ){
        case AuthServives.Actions.Types.LOGIN_LOADING:
            return {...state, isLoading:true };
        case AuthServives.Actions.Types.LOGOUT_USER:
            return {...state,
                id: '',
                jwt: '',
                usuario:'',
                isLoading: false,
                isError: false,
                errorMessage: '',
                isLogin: false
            }
        case AuthServives.Actions.Types.LOGIN_USER:
            return {...state,
                id: action.payload.id,
                jwt:action.payload.jwt,
                usuario:action.payload.usuario,
                isLoading: false,
                errorMessage: '',
                isLoading: false,
                isLogin: true
            };
        case AuthServives.Actions.Types.AUTH_ERROR:
            return {...state, isLoading:false, isError:true, errorMessage:action.payload.errorMessage, isLogin: false}
            default: return state;
    }
}