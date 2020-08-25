import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import { GET_PRODUCTS, PRODUCT_ERROR } from '../types';

const ProductState = (props) => {
  const initialState = {
    products: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products');

      dispatch({
        type: GET_PRODUCTS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: err.response.msg,
      });
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        getProducts,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
