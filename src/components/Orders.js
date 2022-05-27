import React, { useEffect, useState} from "react";
import axios from "axios";

//const SERVER_URL = 'http://localhost:3000/orders.json'
const SERVER_URL_CUSTOMER = 'https://burger-shop-backend.herokuapp.com/customers.json'

const Orders = (props) => {
    const [order, setOrder] = useState([]);
    const [completed, setCompleted] = useState(false);
    const current_order = props.orderID;
        
       
        useEffect(() => {
            axios(`https://burger-shop-backend.herokuapp.com/orders/${current_order}.json`).then((response) => {
                setOrder(response.data);                
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [completed]);

               
    return(
        <div>
            <p>{order.id === undefined ? "No item selected" : <p>{order.products.length} item(s) selected</p> } </p>
            {completed === false ? <CustomerForm current_order={current_order} handleCompleted={setCompleted}/> : <FinaliseOrder order={order}/>}
            
        </div>
    )
}

const CustomerForm = (props) => {
    const current_order = props.current_order
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [customer_id, setCustomerID] = useState('');
   const [order, setOder] = useState([]);

    const _handleChangeName = (event) => {
        setName(event.target.value);              
    }

    const _handleChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(SERVER_URL_CUSTOMER, {customer:{name: name, phone: phone}}).then((response) => {
            setCustomerID(response.data.id);
        })
        await axios.put(`https://burger-shop-backend.herokuapp.com/orders/${current_order}.json`, {order:{customer_id: customer_id}}).then((response) => {
           setOder(response.data);
           console.log(order);
        })
        props.handleCompleted(true);
        
    }
    return(
        <form onSubmit={_handleSubmit}>
            <label>Your Name:
                <input type='text' onChange={_handleChangeName} value={name} required/>
            </label>

            <label>Your Phone Number:
                <input type='text' onChange={_handleChangePhone} value={phone} required/>
            </label>
            
            <input type='submit' value='Enter your details' />
        </form>
    )
    
}

const FinaliseOrder = (props) => {
    
    return(
        <div>
        {props.order.products.map((p) => 
            <div key={p.id}>
                <h3>{p.name}</h3>
            </div>
        )}       
            <p>Total price: {props.order.total_price}</p>   
            <button>Pay</button>
        </div>
    )
}
export default Orders;