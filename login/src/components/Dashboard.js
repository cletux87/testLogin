import React from 'react';
import UserTable from './UserTable';
import UserCreate from './UserCreate';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <UserCreate/>
                <UserTable/>
            </div>
        );
    }
}

export default Dashboard;