import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './order.css';

//const SERVER_URL_ORDERS = 'http://localhost:3000/orders.json'
const SERVER_URL_CUSTOMER = 'https://burger-shop-backend.herokuapp.com/customers.json'
//const SERVER_URL_CUSTOMER = 'http://localhost:3000/customers.json'

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
            {order.id === undefined ? <p className="selectedItem">No item selected</p> : <p className="selectedItem">{order.products.length} item(s) selected</p> } 
            {completed === false ? <CustomerForm current_order={current_order} handleCompleted={setCompleted}/> : <FinaliseOrder order={order}/>}
            
        </div>
    )
}

const CustomerForm = (props) => {
    const current_order = props.current_order
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [phoneNumberCheck, setPhoneNumberCheck] = useState('');
   const [order, setOder] = useState([]);
   const phoneNumberError = [];
   const [validatePhone, setValidatePhone] = useState([]);

    const _handleChangeName = (event) => {
        setName(event.target.value);              
    }

    const _handleChangePhone = (event) => {
        setPhone(event.target.value);
        setPhoneNumberCheck(event.target.value.toString());       
        if(isNaN(Number(event.target.value))){phoneNumberError.push('Please enter a valid phone number')}
        if(phoneNumberCheck[0] !== '0'){phoneNumberError.push('Phone number must begins with 0')}
               
        setValidatePhone(phoneNumberError);        
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();       
        if(phoneNumberCheck.length < 10) {
            phoneNumberError.push('Phone number must be 10 digits');
            props.handleCompleted(false);            
            setValidatePhone(phoneNumberError);
        }else {
            const customer = await axios.post(SERVER_URL_CUSTOMER, {customer:{name: name, phone: phone}});            
            await axios.put(`https://burger-shop-backend.herokuapp.com/orders/${current_order}.json`, {order:{customer_id: customer.data.id}}).then((response) => {
            setOder(response.data);
            console.log(order);           
            })            
            props.handleCompleted(true);
        }       
    }    
    return(
        <div className="customerInfo">
            <form onSubmit={_handleSubmit}>
                <label className="label">Your Name*<br></br>
                    <input className="input" type='text' onChange={_handleChangeName} value={name} required/>
                </label>
                <br></br>
                <label className="label">Your Phone Number*<br></br>
                    <input className="input" type='text' onInput={(e) => {setValidatePhone([])}} onChange={_handleChangePhone} value={phone} required placeholder="04.."/>
                </label>
                {validatePhone.length > 0 ? (
                    <ul>
                        {validatePhone.map((error) => {
                            return <li className="error" key={Math.random()}>{error}</li>
                        })}
                    </ul>
                )
                : ('')    
                }
                <br></br>
                <input className={validatePhone.length > 0  ? "disabledButton" : 'button'} type='submit' value='Place Your Order' disabled={validatePhone.length > 0}/>
            </form>
        </div>
        
    )
}

const FinaliseOrder = (props) => {
    const navigate = useNavigate();
    const _handleClick = (event) => {
        navigate('/payment')
    }
    return(
        <div className="orderIfo">
        <p>Your order for today:</p>
        {props.order.products.map((p) => 
            <div key={p.id}>
                <h4>{p.name}</h4>
            </div>
        )}       
            <p>Total price: ${props.order.total_price}</p>   
            <input className="button" type="submit" value='Pay' onClick={_handleClick} />
        </div>
    )
}
export default Orders;