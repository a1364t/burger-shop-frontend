import React,{ Component, useState } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';



const SERVER_URL = 'https://burger-shop-backend.herokuapp.com/products.json'
const SERVER_URL_POST = 'https://burger-shop-backend.herokuapp.com/orders.json'


class Products extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }; 
    }
    
    componentDidMount() {
        const fetchProducts = () => {
            axios(SERVER_URL).then((response) => {
                this.setState({products: response.data});               
            });
        }
        fetchProducts();
    }

    render() {
        return (
            <div>
                <ProductList products={this.state.products} handleOrderID={this.props.handleOrderID}/>                                
            </div>
        )
    }
}

const ProductList = (props) => {
    
    const navigate = useNavigate();
    const [product_ids, setProduct_ids] = useState ([]);
    const [total_price, setTotalPrice] = useState('');
    const customer_id = ''
    //const [customer_id, setCustomerId] = useState('');
    const [orderID, setOrderID] = useState('')

    const _handleClick = (id, price) => {        
        const newPrice = (Number(total_price) + Number(price)).toString();
        setProduct_ids([...product_ids,id]);
        setTotalPrice(newPrice)      
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();              
        await axios.post(SERVER_URL_POST, {order:{total_price: total_price, product_ids: product_ids, customer_id: customer_id}}).then((response) => 
        {
        setOrderID(response.data.id.toString());        
        props.handleOrderID(response.data.id);
        });
        navigate(`/orders/${orderID}`);
        
    }   
    
    return (    
        <div> 
            {props.products.length === 0 ? <div>Loading...</div> : null}           
                {props.products.map((p) =>
                <div key={p.id}>
                    <h3>{p.name}</h3>
                    <img src={p.image} alt="Product"/>
                    <p>${p.price}</p>                                     
                    {p.available ? <button value={p.id} onClick={() => _handleClick(p.id, p.price)}>Add to order</button> : <p style={{color: 'red'}}>Sold Out</p>}                   
                </div>                     
                )}
                <button onClick={_handleSubmit} disabled={product_ids.length === 0}>Place Order</button>            
        </div>
    )
}

export default Products;

