import * as UserServives from '../actions/users-service';

const INITIAL_STATE = {
    createEmail: '',
    createUsername: '',
    createPassword:'',
    userList: [],
    isLoading: false,
    isError: false,
    errorMessage: '',
    createUserIsLoading: false,
    createUserIsError: false,
    createUserErrorMessage:''
};

export default ( state = INITIAL_STATE, action ) =>{
    switch( action.type ){
        case UserServives.Actions.Types.LOADING_FETCH_USER:
            return {...state, isLoading:true };
        case UserServives.Actions.Types.LOADING_CREATE_USER:
            return {...state, createUserIsLoading:true };
        case UserServives.Actions.Types.FETCH_USERS:
            return {...state,
                userList:action.payload,
                isLoading: false,
                errorMessage: '',
                isLoading: false
            };
        case UserServives.Actions.Types.CREATE_USER:
            return {...state, createUserIsLoading:false, createUserIsError:false, createUserErrorMessage:''}
        case UserServives.Actions.Types.ERROR_FETCH_USER:
            return {...state, isLoading:false, isError:true, errorMessage:action.payload.errorMessage}
        case UserServives.Actions.Types.ERROR_CREATE_USER:
            return {...state, createUserIsLoading:false, createUserIsError:true, createUserErrorMessage:action.payload.errorMessage}
            default: return state;
    }
}