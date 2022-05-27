import React,{Component} from "react";
import axios from 'axios';

const SERVER_URL = 'https://burger-shop-backend.herokuapp.com/customers.json'

class Customers extends Component {
    constructor() {
        super();
        this.state ={
            customers: []
        };
    }

    componentDidMount() {
        const fetchCustomers = () => {
            axios(SERVER_URL).then((response) => {
                this.setState({customers: response.data});
            });
        };
        fetchCustomers();
    }
    
    
    render() {
        return (
            <div>
                <CustomerList customers={this.state.customers} />
            </div>
        )
    }
}

const CustomerList = (props) => {
    return (
        <div>
            <p>{props.customers.length} customers</p>
            {props.customers.map((c) => <p key={c.id}>{c.name}</p>)}
        </div>
    )
}

export default Customers;

