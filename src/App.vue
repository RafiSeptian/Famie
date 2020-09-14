<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view>

      </router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',

  created(){
    console.log = function() {}
  }
}
</script>

<style>
#app {
  font-family: "Segoe UI";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  overflow-x:hidden
}

.fa-star{
  color: gold;
}
.fa-users{
  color:var(--accentColor);
}

i{
  margin-right: 7px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
