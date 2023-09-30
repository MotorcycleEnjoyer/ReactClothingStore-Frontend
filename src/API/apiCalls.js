import axios from "axios";
const BASE_URL = "/api";
const CART_URL = BASE_URL + "/shoppingCart";
const LOGIN_URL = BASE_URL + "/login";
const LOGOUT_URL = BASE_URL + "/logout";
const SEARCH_URL = BASE_URL + "/s?k=";
const REGISTER_URL = BASE_URL + "/register";
const SUGGESTIONS_URL = BASE_URL + "/suggestions";
const RATING_URL = BASE_URL + "/ratings";
const REVIEW_URL = BASE_URL + "/reviews";
const USER_DATA_URL = BASE_URL + "/myDetails";
const SUBMIT_ORDER_URL = BASE_URL + "/submitOrder";
const STRIPE_CHECKOUT_URL = BASE_URL + "/stripeCheckout";
const CHANGE_PASSWORD_URL = BASE_URL + "/changePassword";

let csrfToken;

export async function getShoppingCart() {
    return axios
        .get(CART_URL, { withCredentials: true })
        .then((response) => {
            if (response.data.shoppingCart === undefined) {
                console.error("undefined");
            } else {
                csrfToken = response.data.csrfToken;
                const { shoppingCart, loginStatus } = response.data;
                return { shoppingCart, loginStatus };
            }
        })
        .catch((error) => console.error(error));
}

export async function getSuggestions(data) {
    return axios
        .post(SUGGESTIONS_URL, data)
        .then(function (response) {
            return response.data || [];
        })
        .catch((error) => {
            if (error.response) {
                alert(error.message);
                console.log(
                    error.response.data,
                    error.response.status,
                    error.response.headers
                );
            }
        });
}

export async function getSearchResults(query) {
    return axios
        .get(SEARCH_URL + query, { withCredentials: true })
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
}

export async function getProduct(id) {
    return axios
        .get(`${BASE_URL}/p//id/${id}`, { withCredentials: true })
        .then((response) => {
            return response.data;
        })
        .catch((error) => console.error(error));
}

export async function addToCart(dataObjectHeaders) {
    return axios
        .post(CART_URL, dataObjectHeaders, { withCredentials: true }, csrfToken)
        .then((response) => {
            // const fadeModalContent = document.querySelector(".fadeModal--content")
            // fadeModalContent.innerText = "Added to cart"
            alert("Added to Cart");
            return response.data;
        })
        .catch((error) => console.error(error));
}

export async function editCartItem(dataObjectHeaders) {
    return axios
        .post(
            CART_URL,
            { ...dataObjectHeaders, csrfToken },
            { withCredentials: true }
        )
        .then((response) => {
            alert("Edit Completed");
            // const fadeModalContent = document.querySelector(".fadeModal--content")
            // fadeModalContent.innerText = "Edit completed."
            return response.data;
        })
        .catch((error) => console.error(error));
}

export async function removeFromCart(index) {
    return axios
        .post(
            CART_URL,
            { indexOfCartItem: index, csrfToken },
            { withCredentials: true }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => console.error(error));
}

export async function clearCart() {
    return axios
        .post(CART_URL, { csrfToken }, { withCredentials: true })
        .then((response) => {
            return response.data;
        })
        .catch((error) => console.error(error));
}

export async function register(credentials) {
    return axios
        .post(REGISTER_URL, credentials, { withCredentials: true })
        .then((response) => {
            csrfToken = response.data.csrfToken;
            return response.status;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function login(credentials) {
    return axios
        .post(LOGIN_URL, credentials, { withCredentials: true })
        .then((response) => {
            csrfToken = response.data.csrfToken;
            return response.status;
        })
        .catch((err) => {
            return err.response;
        });
}

export async function logout() {
    axios
        .post(LOGOUT_URL, { dummy: 2 }, { withCredentials: true })
        .then((response) => {
            alert(response.data);
            if (response.data === "POST/logout: Logged out successfully!") {
                window.location = "/";
            }
        })
        .catch((error) => console.error(error));
}

export async function getInitialRatingsAndReviews(productId) {
    return axios
        .post(RATING_URL, { id: productId }, { withCredentials: true })
        .then((response) => {
            const { averageRating, reviews } = response.data;
            return { averageRating, reviews };
        })
        .catch((error) => console.error(error));
}

export async function addProductRating(productRating, productId) {
    return axios
        .post(
            RATING_URL,
            { rating: productRating, id: productId },
            { withCredentials: true }
        )
        .then((response) => {
            const { averageRating } = response.data;
            return { averageRating };
        })
        .catch((error) => console.error(error));
}

export async function addProductReview(productId, payload) {
    return axios
        .post(
            REVIEW_URL,
            { id: productId, ...payload },
            { withCredentials: true }
        )
        .then((response) => {
            alert("Review Received.");
            return response.data;
        })
        .catch((error) => console.error(error));
}

export async function getUserDetails() {
    return axios
        .post(USER_DATA_URL, { csrfToken }, { withCredentials: true })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

export async function submitOrder(payload) {
    return axios
        .post(SUBMIT_ORDER_URL, payload, { withCredentials: true })
        .then((response) => {
            return response.data;
        })
        .catch((error) => console.log(error));
}

export async function checkoutWithStripe(payload) {
    return axios
        .post(STRIPE_CHECKOUT_URL, payload, { withCredentials: true })
        .then((response) => {
            const { url } = response.data;
            window.location = url;
        })
        .catch((error) => console.error(error));
}

export async function changePassword(payload) {
    return axios
        .post(
            CHANGE_PASSWORD_URL,
            { ...payload, csrfToken },
            { withCredentials: true }
        )
        .then((response) => {
            csrfToken = response.data.csrfToken;
            return response.status;
        })
        .catch((error) => console.error(error));
}
