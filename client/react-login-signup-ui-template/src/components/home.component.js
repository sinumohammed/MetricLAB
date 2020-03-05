import React, { Component, useEffect } from "react";
import { connect } from 'react-redux'

import ProductService from "../services/ProductService";

class Home extends Component {
    state = {
        productSuggestion: [],
        products: []
    }
    useEffect = (() => {
        if (this.props.isUserLoggedIn)
            console.log('heello')
    })
    async componentDidMount() {
        try {
            let suggestedProduct = null, _productSuggestion = [];
            const products = (await ProductService.products()).data;
            this.setState({ products: products });
            this.setState({ productSuggestion: products })
            if (this.props.isUserLoggedIn) {
                suggestedProduct = (await ProductService.getSuggestions(this.props.usr.id)).data.suggestions;
                products.map(product => {
                    let suggestionProd = suggestedProduct.find(suggestion => {
                        return suggestion.prodId === product._id;
                    })
                    if (suggestionProd) {
                        suggestionProd._id = product._id;
                        suggestionProd.productName = product.productName;
                        suggestionProd.img = product.img;
                        _productSuggestion.push(suggestionProd)
                    }
                });
                this.setState({ productSuggestion: _productSuggestion });
            }
        } catch (e) {
            console.log(`Login failed: ${e}`);
        }
    }

    render() {
        let heading = <h3>All products available</h3>
        if (this.props.isUserLoggedIn) {
            heading = <h3>Products suggested for you</h3>
        }
        let contents = this.state.productSuggestion.map((product) =>
            <div className="card" key={product._id}>
                <img src={product.img} alt="Denim Jeans" />
                <h1>Tailored Jeans</h1>
                <p className="price">$19.99</p>
                <p>{product.productName}</p>
                <p><button>Add to Cart</button></p>
            </div>

        )
        //}

        return (
            <div>
                {heading}
                <hr />
                {contents}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        tkn: state.token,
        usr: state.user,
        isUserLoggedIn: state.isUserLoggedIn
    }
}

export default connect(mapStateToProps)(Home)