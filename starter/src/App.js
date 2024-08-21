import { useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Nav from "./components/Nav";
import { calculateTotals } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal";

function App() {
  const {cartItems} = useSelector(store => store.cart)
  const {isOpen} = useSelector(state => state.modal)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])


  return( 
  <main>
    <Modal/>
    <Nav/>
    <CardContainer/>
  </main>
)}
export default App;
