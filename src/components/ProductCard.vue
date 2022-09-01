<template>
    <div class="card">
        <img :src="product.get_thumbnail" class="card-img-top product-thumbnail" :alt="product.title">
        <div class="card-body">
        <h6 class="card-title">{{ product.title }}</h6>
        <p class="card-text">{{ product.description.substr(0, 100) }}</p>
        <router-link :to="product.get_absolute_url">
            <button class="btn btn-primary">
            Detail
            </button>
        </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                required: true,
                type: Object
            }
        }
    }
</script>

<style>
    .product-thumbnail {
        width: 100%;
        height: 400px;
    }
</style>