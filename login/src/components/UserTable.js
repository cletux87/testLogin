import React from 'react';
import { connect } from 'react-redux';
import * as AuthService from '../actions/auth-service';
import * as UserService from '../actions/users-service';

class UserTable extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        if( this.props.isLogin ){
            this.props.getUsers(this.props.id, this.props.jwt);
        }

    }

    renderTableData= () => {
        if ( this.props.isLoading && !this.props.isError ){
            return(
                <tr >
                    <td></td>
                    <td></td>
                </tr>
            );
        }else if(this.props.isError){
            return(
                <tr >
                    <td></td>
                    <td></td>
                </tr>
            );
        }else if( !this.props.isLoading && !this.props.isError ) {
            return this.props.userList.map((reg, index) =>{
                const { id, username, email} = reg;
                return(
                    <tr key={id}>
                        <td>{username}</td>
                        <td>{email}</td>
                    </tr>
                );
            });
        }
    }

    handleRefresh = () => {
        this.props.getUsers(this.props.id, this.props.jwt);
    }

    renderTable= () => {
        if ( this.props.isLoading && !this.props.isError ){
            return <h1>Loading...</h1>;
        }else if(this.props.isError && !this.props.isLogin){
            return <h1>Error fetching data</h1>
        }else if( !this.props.isLoading && !this.props.isError && this.props.isLogin ) {
            return (
            <React.Fragment>
                <div className="row align-middle">
                    <h1 className="text-justify">Current Users</h1>
                </div>
                <button className="btn btn-info btn-md" onClick={this.handleRefresh}>Refresh</button>
                <table id='users' class="table">
                    <tbody>
                        <tr>
                            <th scope="col">USERNAME</th>
                            <th scope="col">EMAIL</th>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </React.Fragment>
            );
        }else{
            return <h1>Please login</h1>
        }
    }

    render(){
        return(
            <div>
                {this.renderTable()}
            </div>
        );
    }
}

export default connect(
    state =>{
        return{
            id: AuthService.State.getId(state),
            jwt: AuthService.State.getJwt(state),
            usuario: AuthService.State.getUser(state),
            userList: UserService.State.getUsers(state),
            isLoading: UserService.State.isLoading(state),
            isLogin: AuthService.State.isLogin(state),
            isError: UserService.State.isError(state),
        }

    }, dispatch=>{
        return{
            getUsers: (id, jwt) => dispatch(UserService.fetchUsers(id, jwt)),
        }
    }
)(UserTable);