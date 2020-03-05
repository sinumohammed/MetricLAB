const initialState = {
    token: null,
    user: null,
    isUserLoggedIn: false
}
const reducer = (state = initialState, action) => {
    console.log('reducer')
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                isUserLoggedIn: true,
                user: action.user,
                token: action.token
            };

        case 'LOGOUT_SUCCESS':
            return {
                isUserLoggedIn: false,
                user: null,
                token: null
            };
        default:
            return state
    }
}

export default reducer;