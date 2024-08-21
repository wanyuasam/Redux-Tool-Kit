import { useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Nav from "./components/Nav";
import { calculateTotals } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const {cartItems} = useSelector(store => store.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])


  return( 
  <main>
    <Nav/>
    <CardContainer/>
  </main>
)}
export default App;
