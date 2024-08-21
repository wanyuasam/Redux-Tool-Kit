import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from "axios";

const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://course-api.com/react-useReducer-cart-project');

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
    extraReducers: (builders) => {
        builders
        .addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            // Log the API response to verify its structure
            console.log('API Response:', action.payload);
        
            // Extract the contents and parse it
            const contents = action.payload.contents;
            let cartItems = [];
            
            try {
                cartItems = JSON.parse(contents); // Parse the JSON string into an array
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        
            // Update the state with the parsed array
            state.cartItems = cartItems;
            state.amount = cartItems.length;
            state.total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.amount, 0);
            state.isLoading = false;
        })
        .addCase(getCartItems.rejected, (state) => {
            state.isLoading = false
        })
    }
});


export const { clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions
export default cartSlice.reducer    