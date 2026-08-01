import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props)=> {

    const currency='$'
    const deliveryfee=10

    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(true)
    const [cartItems,setCartItems] = useState({})

    const navigate = useNavigate()

    const addToCart = async(itemId,size)=> {
        let cartData = structuredClone(cartItems)

        if(!size) {
            toast.error('Select Product Size')
            return;
        }

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size]+=1
            } else {
                cartData[itemId][size]=1
            }
        } else {
            cartData[itemId] ={}
            cartData[itemId][size]=1
        }
        setCartItems(cartData)
    }

    const getCartCount = ()=> {
        let totalcount =0
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item]>0) {
                        totalcount+=cartItems[items][item]
                    }
                } catch(error) {
                    toast.error(error.message)
                }
            }
        }
        return totalcount
    }

    const updateQuantity  = async(itemId,size,quantity)=> {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity

        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for(const items in cartItems) {
                let iteminfo = products.find((product)=>product._id=== items)
                for(const item in cartItems[items]) {
                    try {
                        if(cartItems[items][item]>0) {
                            totalAmount+=iteminfo.price * cartItems[items][item]
                        }
                    } catch(error) {
                        toast.error(error.message)
                    }
                }
        }
        return totalAmount
    }


    const value = {
        products,currency,deliveryfee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,
        getCartAmount,
        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider