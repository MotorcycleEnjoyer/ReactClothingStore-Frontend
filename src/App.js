import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./Components/SmallComponents/SearchBar/Search.css";
import "./Components/ShoppingProduct/ShoppingProduct.css";
import "./Components/NavBar/NavBar.css";
import "./Components/SmallComponents/ColorSelector/ColorSelector.css";

import Root from "./Routes/Root";
import NewSearch, { loader as SearchLoader } from "./Routes/NewSearch";
import NewProduct, { loader as NewProductLoader } from "./Routes/NewProduct";
import NewCart from "./Routes/NewCart";
import NewLogin, { action as loginAction } from "./Routes/NewLogin";
import NewRegister, { action as registerAction } from "./Routes/NewRegister";

import {
    editCartItem,
    getShoppingCart,
    removeFromCart,
    addToCart,
    clearCart,
    submitOrder,
} from "./API/apiCalls";
import {
    ShoppingCartContext,
    ShoppingCartDispatchContext,
    LoginContext,
} from "./Contexts/ShoppingContext";
import NewHomePage from "./Routes/NewHomePage";

import UserPage from "./Routes/UserPage";
import OrderHistory from "./Components/UserPage/OrderHistory/OrderHistory";
import LandingPage from "./Components/UserPage/UserLandingPage";
import ChangePassword, {
    action as PwChangeAction,
} from "./Components/UserPage/ChangePassword/ChangePassword";

export default function App() {
    const [shoppingCartAndAuth, dispatch] = useAsyncReducer(
        shoppingCartReducer,
        null
    );
    React.useEffect(() => {
        const online = navigator.onLine;
        if (!online) {
            document.querySelector("#root").innerText =
                "Not connected to internet.";
        } else {
            dispatch({
                type: "getCart",
            });
        }
    }, []);

    if (shoppingCartAndAuth === null) {
        return <h1>Loading...</h1>;
    } else {
        return (
            <>
                <LoginContext.Provider
                    value={shoppingCartAndAuth.loginStatus === "user"}
                >
                    <ShoppingCartContext.Provider
                        value={shoppingCartAndAuth.shoppingCart}
                    >
                        <ShoppingCartDispatchContext.Provider value={dispatch}>
                            <RouterProvider router={router} />
                        </ShoppingCartDispatchContext.Provider>
                    </ShoppingCartContext.Provider>
                </LoginContext.Provider>
            </>
        );
    }
}

/*
Credit for the useAsyncReducer goes to:
https://medium.com/@patrick.gross1987/how-to-use-the-react-context-api-with-an-asynchronous-reducer-5651c2dc26aa
*/
const useAsyncReducer = (reducer, initialState) => {
    const [state, setState] = React.useState(initialState);

    const dispatch = async (action) => {
        const result = reducer(state, action);
        if (typeof result.then === "function") {
            try {
                const newState = await result;
                if (newState === undefined) {
                    document.querySelector("#root").innerText =
                        "Server unavailable";
                    return;
                }
                setState(newState);
            } catch (err) {
                setState({ ...state, error: err });
            }
        } else {
            setState(result);
        }
    };

    return [state, dispatch];
};

function shoppingCartReducer(shoppingCart, action) {
    switch (action.type) {
        case "getCart": {
            return getShoppingCart();
        }
        case "addToCart": {
            return addToCart(action.properties);
        }
        case "editCartItem": {
            return editCartItem(action.properties);
        }
        case "deleteCartItem": {
            return removeFromCart(action.properties);
        }
        case "clearCart": {
            return clearCart(action.properties);
        }
        case "submitOrder": {
            return submitOrder(action.properties);
        }
        default: {
            return getShoppingCart();
        }
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>No server connection.</h1>,
        children: [
            {
                path: "/",
                element: <NewHomePage />,
                errorElement: <h1>Homepage Failed to Load</h1>,
            },
            {
                path: "/s",
                element: <NewSearch />,
                errorElement: <h1>Search Failed</h1>,
                loader: SearchLoader,
            },
            {
                path: "/p/:productName/id/:productId",
                element: <NewProduct />,
                errorElement: <h1>Product Load Failed</h1>,
                loader: NewProductLoader,
            },
            {
                path: "/cart",
                element: <NewCart />,
                errorElement: <h1>Cart Failed to Load</h1>,
            },
        ],
    },
    {
        path: "/login",
        element: <NewLogin />,
        action: loginAction,
        errorElement: <h1>Login Error</h1>,
    },
    {
        path: "/register",
        action: registerAction,
        element: <NewRegister />,
        errorElement: <h1>Registration Error</h1>,
    },
    {
        path: "/userpage",
        element: <UserPage />,
        errorElement: <h1>Could not retrieve user details.</h1>,
        children: [
            {
                path: "/userpage",
                element: <LandingPage />,
                errorElement: <h1>REEE</h1>,
            },
            {
                path: "/userpage/orderHistory",
                element: <OrderHistory />,
                errorElement: <h1>Not logged in!</h1>,
            },
            {
                path: "/userpage/resetPassword",
                element: <ChangePassword />,
                errorElement: <h1>Password Change Failed!</h1>,
                action: PwChangeAction,
            },
            {
                path: "/userpage/ratingAndReviewHistory",
                element: <h1>Rating/Review History Element</h1>,
                errorElement: <h1>Not logged in!</h1>,
            },
        ],
    },
]);
