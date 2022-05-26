import React, {useEffect, useState} from "react";
import axios from "axios";

const SERVER_URL = 'http://localhost:3000/orders.json'

const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    const current_order = props.orderID 
    console.log(props.orderID);  
        useEffect (() => {
            axios(SERVER_URL, {}).then((response) => {                
                setOrders(response.data);                
                console.log(orders);
            });
        }, []);
        // console.log(orders);
        // orders.forEach(function() {
        //     if (orders.id === current_order){
        //         console.log('found');
        //     }
        // })     
        
    return(
        <div>
            order coming soon
        </div>
    )
}

export default Orders;