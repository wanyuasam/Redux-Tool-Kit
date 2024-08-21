import { CartIcon } from "../icons";
import {useSelector} from 'react-redux'


function Nav() {
    // console.log(useSelector((state) => console.log(state) ))
    const {amount} = useSelector((store) => store.cart)
  return (
    <nav>
        <div className="nav-center">
            <h3>Redux toolkit</h3>
            <div className="nav-container">
                <CartIcon/>
            </div>
            <div className="amount-container">
                <p className="total-amount">{amount}</p>
            </div>
        </div>
    </nav>
  )
}

export default Nav