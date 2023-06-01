import { createContext, useReducer } from "react"

export const wholeshop = createContext()

const initialstate = {
    userdetail: localStorage.getItem('userdetail')
        ? JSON.parse(localStorage.getItem('userdetail'))
        : null,

    cart: {

        paymentMethod: localStorage.getItem('paymentMethodType')
            ? localStorage.getItem('paymentMethodType')
            : '',

        shippaddres: localStorage.getItem('saveshippaddres')
            ? JSON.parse(localStorage.getItem('saveshippaddres'))
            : {},

        cartitems: localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) :
            [],
    }
}
const reducer = (state, action) => {
    switch (action.type) {
        case "Addtocart":
            const newItem = action.payload;
            const existItem = state.cart.cartitems.find(
                (item) => item._id === newItem._id
            );
            const cartitems = existItem
                ? state.cart.cartitems.map((item) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.cartitems, newItem];
            localStorage.setItem('cartitems', JSON.stringify(cartitems));
            return { ...state, cart: { ...state.cart, cartitems } };


        case "removeitem": {
            const cartitems = state.cart.cartitems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartitems', JSON.stringify(cartitems));
            return { ...state, cart: { ...state.cart, cartitems } };
        };

        case "removeall":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartitems: []
                }
            };
        case "clearcart":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartitems: []
                }
            };

        case 'userLogin':
            return {
                ...state,
                userdetail: action.payload
            };

        case 'usersignout':
            return {
                ...state,
                userdetail: null,
                cart: {
                    cartitems: [],
                    shippaddres: {},
                    paymentMethod: ''

                }
            };

        case "saveshippaddres":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippaddres: action.payload,
                }
            }
        case "paymentMethodType": {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }
        }

        default:
            return state;
    }
}

export function StoreContex(props) {
    const [state, dispatch] = useReducer(reducer, initialstate);
    const value = { state, dispatch }

    return <wholeshop.Provider value={value}>
        {props.children}
    </wholeshop.Provider>
}

