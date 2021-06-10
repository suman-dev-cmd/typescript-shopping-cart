import Cartitem from '../cartitem/Cartitem';
import {Wrapper} from './Cart.Style';
import {CartItemType} from '../App';

type Props = {
    cartItems:CartItemType[];
    addToCart:(clickedIem:CartItemType) => void;
    removeFromCart:(id: number) => void;
}

const Cart: React.FC<Props> =({cartItems,addToCart,removeFromCart})=>{
    console.log(cartItems)
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0?<p>No items in cart</p>:null}
            {
                cartItems.map(item=>(
                    <Cartitem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
                ))
            }
        </Wrapper>
    );
}
export default Cart;