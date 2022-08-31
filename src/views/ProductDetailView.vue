<template>
  <div class="container">
    <div class="row">
      <div class="col-4 mt-5">
        <h1>{{ product.title }}</h1>
        <img :src="product.get_image" class="img img-responsive">
        <h2 class="mt-5">Deskripsi</h2>
        <p>{{ product.description }}</p>
      </div>
      <div class="col-3 mt-5">
        <div class="form-group">
          <label for="">Qty</label>
          <input class="form-control" type="number" min="1" v-model="quantity">
        </div>
        <div class="form-group">
          <label for="">Price</label>
          <input readonly class="form-control-plaintext" type="text" :value="'Rp' + product.price">
        </div>
        <button @click="addToCart" class="btn btn-success">Tambah ke Keranjang</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {useStore} from '@/store/main'

  export default {
    setup() {
      const store = useStore();
      return {store}
    },
    data() {
      return {
        product: [],
        quantity: 1
      }
    },
    mounted() {
      this.getProduct()
    },
    methods: {
      getProduct() {
        const categorySlug = this.$route.params.category_slug
        const productSlug = this.$route.params.product_slug
        axios.get(`/product/${categorySlug}/${productSlug}`)
          .then(({data}) => {
            this.product = data
            document.title = this.product.title
          })
          .catch(error => {
            console.log(error)
          })
      },

      addToCart() {
        this.store.addToCart(this.product, this.quantity)
      }
    }
  }
</script>