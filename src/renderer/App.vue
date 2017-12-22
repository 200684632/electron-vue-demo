<template>
  <div id="app" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed:{
    user_load() {
      return this.$store.state.Counter.user
    }
  },
  created() {
    
  },
  methods:{
  },
  watch: {
    user_load(newVal, oldVal) {
      if(newVal) {
        this.$router.push('/')
      }else{
        this.$router.push('/login')
      }
    }
  }
}
</script>

