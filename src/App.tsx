import {useState} from 'react';
import {useQuery} from 'react-query';
import {Drawer,LinearProgress,Grid,Badge} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
//components
import Item from "./item/Item";
import Cart from './cart/Cart';
//style
import {Wrapper,StyledButton} from './App.Style';
//type
export type CartItemType ={
  id:number,
  category:string,
  description:string,
  image:string,
  price:number,
  title:string,
  amount:number
}
const getProducts = async():Promise<CartItemType[]>=>
  await (await fetch('https://fakestoreapi.com/products')).json();
const App = () => {
  const [cartOpen,setCartOpen] = useState(false);
  const [cartItems,setCartItems] = useState([] as CartItemType[]);
  const {data,isLoading,error} = useQuery<CartItemType[]>('products',getProducts);
  console.log(isLoading);
  const getTotalItems = (items:CartItemType[]) => 
    items.reduce((ack:number,item)=>ack+item.amount,0); 
  const handleAddToCart = (clickedItem:CartItemType) => {
    setCartItems(prev=>{
      const isItemInCart = prev.find(item=>item.id ===clickedItem.id)
      if(isItemInCart){
        return prev.map(item=>
          item.id === clickedItem.id?
          {...item,amount:item.amount+1}
          :item
        )
      }
      return [...prev,{...clickedItem,amount:1}] 
    });
  };
  const handleRemoveFromCart = (id:number) => {
    setCartItems(prev=>(
      prev.reduce((ack,item)=>{
        if(item.id === id){
          if(item.amount === 1) return ack;
          return [...ack,{...item,amount:item.amount -1}];
        }else{
          return [...ack,item];
        }
      },[] as CartItemType[])
    ))
  };
  if(isLoading) return <LinearProgress />;
  if(error) return <div>Somthing is wrong.......</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}></Cart>
      </Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item=>(
          <Grid
          item
          key={item.id}
          xs={12}
          sm={4}
          >
            <Item item={item} handleAddToCart={handleAddToCart}></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App;