<template>
  <div>
    <top-navbar></top-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
import TopNavbar from "@/components/HomePage/TopNavBar"
export default {
  data(){
    return{}
  },
  components:{
    TopNavbar
  }
}
</script>
