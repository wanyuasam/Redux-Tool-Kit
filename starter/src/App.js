import { useEffect } from "react";
import CardContainer from "./components/CardContainer";
import Nav from "./components/Nav";
import { calculateTotals,getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal";

function App() {
  const {cartItems, isLoading} = useSelector(store => store.cart)
  const {isOpen} = useSelector(store => store.modal)
  const dispatch = useDispatch();

  // calculating totals
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  useEffect(() => {
    dispatch(getCartItems())
  },[])

  if(isLoading){
    return <div className="loading">
        <h1>Loading...</h1>
    </div>
  }


  return( 
  <main>
    {/* conditional rendering */}
    {isOpen && <Modal/>}
    {/* <Modal/> */}
    
    <Nav/>
    <CardContainer/>
  </main>
)}
export default App;
