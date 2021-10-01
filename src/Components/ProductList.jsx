import React, {Component} from 'react';
import axios from "axios";
import { Route, Router } from 'react-router';
import { Link } from 'react-router-dom';
import ProductDescription from './ProductDescription';
import Reviews from './Reviews';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            product: [],
            search: ''
         }
    }

    
    componentDidMount(){
        this.getProduct()
    }
    
    async getProduct(){
        let response = await axios.get('https://localhost:44394/api/product')
        this.setState({
            product: response.data
        })
    }
    
    


    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = (event) =>{
        event.preventDefault();
        this.filteredSearch()
    }

    // filteredSearch = () =>{
    //     let filteredResults = this.state.Product.filter(song => {
    //         return song.title.toLowerCase().includes(this.state.search.toLowerCase()) || Product.name.toLowerCase().includes(this.state.search.toLowerCase()) || Product.reviews.toLowerCase().includes(this.state.search.toLowerCase()) || Product.description.toLowerCase().includes(this.state.search.toLowerCase()) || Product.genre.toLowerCase().includes(this.state.search.toLowerCase())
    //     })
    //     this.setState({
    //         Product : filteredResults
    //     })
    // }
    

    render() { 
        return (
        <React.Fragment>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Genre</th>
                        <th>
                            <form onSubmit = {this.handleSubmit}>
                                <input name= 'search' onChange = {this.handleChange} value = {this.state.search}/> 
                                <button type = 'submit'>Search!</button>
                            </form>
                        </th>
                        <th>
                        <button onClick = {() => this.setState(this.getProduct)}>Show All</button>
                        </th>
                    </tr>
                </thead>
                {this.state.product.map((element) => <><tbody><tr class="active-row"><td>{element.name}</td> <td>{element.description}</td> <td>{element.price}</td><td><Reviews product = {element.id}/></td><td><Link to ={{pathname: '/product_description', product: element}}>Product description</Link></td></tr></tbody></>)}
             
            </table>
            
        </React.Fragment> 
         );
    }
}
 
export default ProductList;