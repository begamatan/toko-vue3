<template>
    <div id="cart-page">
        <div class="container">
            <div class="row mt-5">
                <div class="col-3">
                    <h3>Keranjang</h3>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <table class="table table-default">
                        <thead>
                            <tr>
                                <th>Judul</th>
                                <th>Jumlah</th>
                                <th>Harga</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cart.items" :key="item.id">
                                <td>{{ item.title }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ convertToCurrency(Number(item.price)) }}</td>
                                <td>{{ convertToCurrency(item.quantity * Number(item.price)) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row" v-if="store.isAuthenticated">
                <div class="col-4">
                    <form method="post" @submit.prevent="checkout">
                        <p>Total: {{ convertToCurrency(totalPrice) }}</p>
                        <button type="submit" class="btn btn-primary">Bayar</button>
                    </form>
                </div>
            </div>
            <div class="row" v-if="!store.isAuthenticated && totalPrice > 0">
                <div class="col-4">
                    <p>Untuk melanjutkan pembayaran silahkan log in <router-link to="/login">di sini</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {useStore} from '@/store/main'
    import axios from 'axios'

    export default {
        setup() {
            const store = useStore()
            return { store }
        },
        data() {
            return {
                cart: {
                    items: []
                }
            }
        },
        mounted() {
            this.cart = this.store.cart
            document.title = 'Keranjang | Toko Buku'
        },
        methods: {
            convertToCurrency(number) {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
            },
            checkout() {
                const orderDetails = [];
                this.cart.items.forEach((item) => {
                    orderDetails.push({
                        product: item.id,
                        price: item.price,
                        quantity: item.quantity
                    })
                })
                const data = {
                    total: this.totalPrice,
                    order_details: orderDetails
                }
                const headers = {
                    'Authorization': `Token ${this.store.token}`
                }
                console.log(headers)
                axios.post('/order/checkout/', data, {
                    headers: headers
                }).then((response) => {
                    this.store.clearCart()
                    location.href = response.data.data.url
                }).catch((error) => {
                    console.log(error)
                })
            }
        },

        computed: {
            totalPrice() {
                return this.cart.items.reduce((prev, current) => {
                    return Number(
                        prev + (Number(current.price) * current.quantity)
                    )
                }, 0)
            }
        }
    }
</script>