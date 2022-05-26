import React,{ Component, useState } from "react";
import axios from "axios";



const SERVER_URL = 'http://localhost:3000/products.json'
const SERVER_URL_POST = 'http://localhost:3000/orders.json'


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
                this.setState({products: response.data})
            });
        }
        fetchProducts();
    }

    render() {
        return (
            <div>
                <ProductList products={this.state.products} />                                
            </div>
        )
    }
}

const ProductList = (props) => {
    const [product_ids, setProduct_ids] = useState ([]);
    const [total_price, setTotalPrice] = useState('');
    const [customer_id, setCustomerId] = useState('');

    const _handleClick = (id, price) => {
        console.log('before', product_ids);
        const newPrice = (Number(total_price) + Number(price)).toString();
        setProduct_ids([...product_ids,id]);
        setTotalPrice(newPrice)
        console.log(total_price, 'after', product_ids);
        
    }

    const _handleSubmit = (event) => {
        event.preventDefault();        
        axios.post(SERVER_URL_POST, {order:{total_price: total_price, product_ids: product_ids, customer_id: customer_id}}).then((response) => 
        {
            console.log(response.data);
        });
    }

    
    
    return (
        <div>           
                {props.products.map((p) =>
                <div key={p.id}>
                    <h3>{p.name}</h3>
                    <img src={p.image} />
                    <p>Price: ${p.price}</p>                    
                        <button value={p.id} onClick={() => _handleClick(p.id, p.price)}>Add to order</button>                   
                    </div>                     
                )}
                <button onClick={_handleSubmit}>Place Order</button>            
        </div>
    )
}

export default Products;

