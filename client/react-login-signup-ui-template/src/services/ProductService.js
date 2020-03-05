import Api from './API'

export default {
    products() {
        return Api().get('products')
    },
    getSuggestions(userId) {
        return Api().get(`getSuggestions/${userId}`)
    }
}
