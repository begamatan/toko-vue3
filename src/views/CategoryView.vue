<!-- <script setup>
  import { RouterLink } from 'vue-router'
</script> -->

<template>
    <div class="container">
      <div class="row">
        <div class="col mt-3">
          <h3>{{ category.title }}</h3>
          <div class="row">
            <div class="col-3" v-for="product in category.products" :key="product.id">
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
          category: {
            products: []
          }
        }
      },
      mounted() {
        this.getCategory()
      },
      watch: {
        $route(to, from) {
          if (to.name === 'category_detail') {
            this.getCategory()
          }
        }
      },
      methods: {
        getCategory() {
          const categorySlug = this.$route.params.category_slug
          axios.get(`/product/${categorySlug}`)
            .then(({data}) => {
              this.category = data
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    }
  </script>