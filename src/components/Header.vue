<template>
  <!-- Header Section Begin -->
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="ht-left">
          <div class="mail-service">
            <i class="fa fa-envelope"></i> muhammad.arnaldo@gmail.com
          </div>
          <div class="phone-service">
            <i class="fa fa-phone"></i> +62821 81146040
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="inner-header">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="logo">
              <router-link to="/">
                <h2>Arnaldo Store</h2>
              </router-link>
            </div>
          </div>
          <div class="col-lg-3 col-md-3"></div>
          <div class="col-lg-3 text-right col-md-3">
            <ul class="nav-right">
              <li class="cart-icon">
                Shopping cart &nbsp;
                <a href="#">
                  <i class="icon_bag_alt"></i>
                  <span>{{ cart.length }}</span>
                </a>
                <div class="cart-hover" v-if="cart.length">
                  <div class="select-items">
                    <table>
                      <tbody v-for="item in cart" :key="item.id">
                        <tr>
                          <td class="si-pic">
                            <img :src="item.photo" alt />
                          </td>
                          <td class="si-text">
                            <div class="product-selected">
                              <p>${{ item.price }}</p>
                              <h6>{{ item.name }}</h6>
                            </div>
                          </td>
                          <td class="si-close">
                            <i class="ti-close" @click="removeCartItem(item.id)"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="select-total">
                    <span>total:</span>
                    <h5>${{ subtotal }}</h5>
                  </div>
                  <div class="select-button">
                    <router-link to="/shopping-cart" class="primary-btn checkout-btn">CHECK OUT</router-link>
                  </div>
                </div>
                <div class="cart-hover" v-else>
                  <h6 class="text-muted text-center">Your cart is empty</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header End -->
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      cart: []
    };
  },
  methods: {
    removeCartItem(idP) {
      let isi = this.cart.map(isi => isi.id);
      let index = isi.findIndex(id => id === idP);
      this.cart.splice(index, 1);
      this.saveCart();
    },
    saveCart() {
      const parsed = JSON.stringify(this.cart);
      localStorage.setItem("cart", parsed);
    }
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      try {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  },
  computed: {
    subtotal: function() {
      return this.cart.reduce(function(acc, arr) {
        return acc + arr.price;
      }, 0);
    }
  }
};
</script>