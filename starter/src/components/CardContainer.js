import React from 'react'
import CardItem from './CardItem'
import { useSelector, useDispatch } from 'react-redux'
// import { clearCart } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'
import { clearCart } from '../features/cart/cartSlice'


export default function CardContainer() {
    const dispatch = useDispatch()
    const {cartItems, total, amount} = useSelector(state => state.cart)
    if(amount < 1){
        return (
            <section className='cart'>
                <header>
                    <h2>
                        Your wishlist
                    </h2>
                    <h4 className='empty-cart'>
                        is currently empty
                    </h4>
                </header>
            </section>
        )
    }
  return (
    <section className='cart'>
        <header>
            <h2>
                Your Wishlist
            </h2>
        </header>
        <div>
            {cartItems.map(cartItem => {
                return <CardItem key={cartItem.id} {...cartItem}/>
            })}
        </div>
        {/* footer */}
        <footer>
            <hr/>
            <div className='cart-total'>
                <h4>Total <span>${total.toFixed(2)}</span></h4>
            </div>
            <button className='btn clear-btn' onClick={() => {
                console.log('Clear Wishlist button clicked');
                dispatch(openModal())
                // dispatch(clearCart())
                }}
                >Clear Wishlist</button>
        </footer>
    </section>
  )
}
