import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as AuthService from '../actions/auth-service';
import * as UserService from '../actions/users-service';

class UserCreate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuario: '',
            email: '',
            password:'',
            usuarioError: '',
            emailError:'',
            passError: ''
          };
    }

    handleChange = ( event ) =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleCreateUser = () =>{
        let error = false;
        this.setState({
            usuarioError: '',
            emailError: '',
            passError: '',

        });
        if( this.state.usuario.length <= 0  ){
            this.setState({usuarioError: 'El usuario no puede estar varcio'});
            error = true;
        }
        if( this.state.email.length <= 0  ){
            this.setState({emailError: 'El email no puede estar varcio'});
            error = true;
        }
        if( this.state.email.length <= 0  ){
            this.setState({passError: 'El password no puede estar varcio'});
            error = true;
        }
        if( !error ){
            this.props.createUser(this.props.id, this.props.jwt, this.state.usuario, this.state.email, this.state.password);
        }
    }

    renderForm = () =>{
        if(this.props.isLogin){
            return (
                <React.Fragment>
                    <h1>Create User</h1>
                    <div className="form-group">
                        <label>USERNAME:</label>
                        <input className="form-control" name="usuario" value={this.state.usuario} onChange={this.handleChange}/>
                        {this.state.usuarioError}
                        <label>EMAIL:</label>
                        <input className="form-control" name="email" value={this.state.email} onChange={this.handleChange}/>
                        {this.state.emailError}
                        <label>PASSWORD:</label>
                        <input className="form-control" name="password" value={this.state.password} onChange={this.handleChange}/>
                        {this.state.passError}
                        <button type="password" className="btn btn-info btn-md" onClick={this.handleCreateUser}>Submit</button>
                    </div>
                </React.Fragment>
            );
        }else{
            return;
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.renderForm()}
            </React.Fragment>
        );
    }
}

export default connect(
    state =>{
        return{
            id: AuthService.State.getId(state),
            jwt: AuthService.State.getJwt(state),
            usuario: AuthService.State.getUser(state),
            isLogin: AuthService.State.isLogin(state),
        }

    }, dispatch=>{
        return{
            getUsers: (id, jwt) => dispatch(UserService.fetchUsers(id, jwt)),
            createUser: (id, jwt, username, email, pass) => dispatch(UserService.createUser(id, jwt, username, email, pass)),
        }
    }
)(UserCreate);