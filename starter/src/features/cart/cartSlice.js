import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from "axios";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState ={
    cartItems: cartItems,
    amount: cartItems.length,
    total: 0,
    isLoading: true,

}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () =>{
    try{
        const response = await axios.get(url);
        return response.data
    }
    catch(error){
        console.log(error)
        return []
    }
})



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
            // return {cartItems: []}
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find(item => item.id === payload.id) 
            cartItem.amount = cartItem.amount + 1           
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find(item => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: (state) =>{
            let amount = 0
            let total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            });
            state.amount = amount
            state.total =total
        }
    },
    extraReducers: (builders){
        builders
        .addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload
            state.amount = action.payload.length
            state.total = action.payload.reduce((sum, item) => sum + item.price * item.amount, 0)
        })
        .addCase(getCartItems.rejected, (state) => {
            state.isLoading = false
        })
    }
});


export const { clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions
export default cartSlice.reducer    