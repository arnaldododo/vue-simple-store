<template>
  <!-- Banner Section Begin -->
  <section class="women-banner spad" id="list-product">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="products.length">
          <carousel class="product-slider" :items="3" :nav="false" :autoplay="true">
            <div class="product-item" v-for="item in products" :key="item.id">
              <div class="pi-pic">
                <img :src="item.galleries.find(gallery => gallery.is_default === 1).photo" alt />
                <ul>
                  <li class="w-icon active">
                    <a
                      href="#"
                      @click="addToCart(item.id, item.name, item.price, item.galleries.find(gallery => gallery.is_default === 1).photo)"
                    >
                      <i class="icon_bag_alt"></i>
                    </a>
                  </li>
                  <li class="quick-view">
                    <router-link :to="'/product/'+item.id">+ View Item</router-link>
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ item.type }}</div>
                <router-link :to="'/product/'+item.id">
                  <h5>{{ item.name }}</h5>
                </router-link>
                <div class="product-price">${{ item.price }}</div>
              </div>
            </div>
          </carousel>
        </div>
        <div class="col-lg-12" v-else>
          <p>Data produk terbaru belum tersedia untuk saat ini.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Banner Section End -->
</template>


<script>
// @ is an alias to /src
import carousel from "vue-owl-carousel";
import axios from "axios";

export default {
  name: "Banner",
  components: {
    carousel
  },
  data() {
    return {
      products: [],
      cart: []
    };
  },
  mounted() {
    axios
      .get(this.$api_url + "products")
      .then(res => (this.products = res.data.data.data));

    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  methods: {
    addToCart(id, name, price, photo) {
      let product = {
        id,
        name,
        price,
        photo
      };
      this.cart.push(product);
      const parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
      window.location.reload();
    }
  }
};
</script>
