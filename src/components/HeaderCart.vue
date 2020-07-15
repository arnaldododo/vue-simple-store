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
            <ul class="nav-right"></ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Header End -->
</template>

<script>
export default {
  name: "HeaderCart"
};
</script>