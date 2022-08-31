<!-- <script setup>
  import { RouterLink } from 'vue-router'
</script> -->

<template>
    <div class="container">
      <div class="row">
        <div class="col mt-3">
          <p>Search result for keyword <strong>{{ q }}</strong> (Total: {{ products.length }})</p>
          <div class="row">
            <div class="col-3" v-for="product in products" :key="product.id">
              <div class="card" style="width: 18rem;">
                <img :src="product.get_image" class="card-img-top" :alt="product.title">
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <p class="card-text">{{ product.description }}</p>
                  <router-link :to="product.get_absolute_url">
                    <button class="btn btn-primary">
                      Detail
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
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
          products: [],
          q: ''
        }
      },
      mounted() {
        this.q = this.$route.query.q
        this.search()
      },
      methods: {
        search() {
          axios.get(`/product/list?search=${this.q}`)
            .then(({data}) => {
              this.products = data
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  </script>