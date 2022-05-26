import React, {useEffect, useState} from "react";
import axios from "axios";

const SERVER_URL = 'http://localhost:3000/orders.json'

const Orders = (props) => {
    const [order, setOrder] = useState('');
    const current_order = props.orderID
        useEffect (() => {
            axios(SERVER_URL).where('id' == current_order).then((response) => {                
                setOrder(response.data);
            });
        }, []);
        
        console.log('orders', order);
    
    //console.log('Loden 3', props.orderID.toString())
    return(
        <div>
            Order comming soon
        </div>
    )
}

export default Orders;