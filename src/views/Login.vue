<template>
    <div id="login-page">
        <div class="container">
            <div class="row mt-5">
                <div class="col-4 offset-4">
                    <form method="post" @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input required type="text" class="form-control" v-model="login.username">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input required type="password" class="form-control" v-model="login.password">
                            <div class="form-text">Belum punya akun? Register <router-link to="/register">di sini</router-link>.</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { useStore } from '@/store/main'

    export default {
        setup() {
            const store = useStore()
            return {store}
        },
        mounted() {
            document.title = 'Login | Toko Buku'
        },
        data() {
            return {
                login: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm() {
                axios.post('/token/login/', this.login)
                    .then((response) => {
                        const token = response.data.auth_token
                        this.store.login(token, this.login.username)
                        this.$router.push('/')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
    }
</script>