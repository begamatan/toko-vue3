<template>
    <div id="my-order">
        <div class="container">
            <div class="row mt-3">
                <div class="col">
                    <table class="table table-default">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in orders" :key="order.id">
                                <td>{{ order.id }}</td>
                                <td>{{ order.status }}</td>
                                <td>{{ convertToCurrency(order.total) }}</td>
                                <td>{{ new Date(order.created_at) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {useStore} from '@/store/main'

    export default {
        setup() {
            const store = useStore()
            return {store}
        },
        mounted() {
            this.getOrder()
        },
        data() {
            return {
                orders: []
            }
        },
        methods: {
            getOrder() {
                const headers = {
                    'Authorization': `Token ${this.store.token}`
                }

                axios.get('/order/list/', {
                    headers
                }).then(({data}) => {
                    this.orders = data
                }).catch((error) => {
                    console.log(error)
                })
            },
            convertToCurrency(number) {
                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(number))
            }
        }
    }
</script>