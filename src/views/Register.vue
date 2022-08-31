<template>
    <div id="register-page">
        <div class="container">
            <div class="row mt-5">
                <div class="col-4 offset-4">
                    <form method="post" @submit.prevent="submitForm" class="needs-validation row" novalidate>
                        <div class="col-12 mb-3">
                            <label class="form-label">Username</label>
                            <input required type="text" class="form-control" v-model="register.username">
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label">Password</label>
                            <input required type="password" class="form-control" v-model="register.password">
                        </div>
                        <div class="col-12 mb-3">
                            <label class="form-label">Konfirmasi Password</label>
                            <input required type="password" class="form-control" v-model="register.c_password">
                            <div class="invalid-feedback" :class="{'d-block': errors.c_password}">
                                {{ errors.c_password }}
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Daftar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                register: {
                    username: '',
                    password: '',
                    c_password: ''
                },
                errors: {
                    c_password: ''
                }
            }
        },
        mounted() {
            document.title = 'Register | Toko Buku'
        },
        methods: {
            submitForm() {
                this.resetErrors()
                if (this.register.c_password != this.register.password) {
                    this.errors.c_password = 'Konfirmasi Password harus sama dengan Password'
                }

                if (!this.errors.c_password) {
                    axios.post('/users/', this.register)
                        .then((response) => {
                            this.$router.push('/login')
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            },
            resetErrors() {
                this.errors = {
                    c_password: ''
                }
            }
        }
    }
</script>