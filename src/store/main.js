import { defineStore, acceptHMRUpdate  } from "pinia";

export const useStore = defineStore('main', {
    state: () => ({
        isAuthenticated: false,
        token: '',
        username: '',
        cart: {
            items: []
        },
        isLoading: false
    }),
    getters: {
        cartCount(state) {
            return state.cart.items.length
        },
    },
    actions: {
        setCart() {
            if (localStorage.getItem('cart')) {
                this.cart = JSON.parse(localStorage.getItem('cart'))
            } else {
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }

            const token = this.$cookies.get('token')
            if (token) {
                this.isAuthenticated = true
                this.token = token
                this.username = this.$cookies.get('username')
            }
        },

        clearCart() {
            this.cart = {
                items: []
            }
            localStorage.setItem('cart', JSON.stringify(this.cart))
        },

        addToCart(product, quantity) {
            const exist = this.cart.items.filter((item) => item.id == product.id)
            if (exist.length) {
                this.cart.items.forEach((item, key) => {
                    if (item.id === product.id) {
                        item.quantity += quantity
                        this.cart.items[key] = item
                    }
                });
            } else {
                product.quantity = quantity
                this.cart.items.push(product)
            }

            localStorage.setItem('cart', JSON.stringify(this.cart))
        },

        login(token, username) {
            this.isAuthenticated = true
            this.token = token
            this.username = username

            this.$cookies.set('token', token)
            this.$cookies.set('username', username)
        }
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}