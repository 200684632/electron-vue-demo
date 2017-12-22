<template>
  <div id="app">
    <router-view></router-view>
    <button @click="test">测试</button>
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
    test() {
      this.$store.dispatch('user_load')
    }
  },
  watch: {
    user_load(newVal, oldVal) {
      if(newVal) {
        this.$router.push('/test')
      }else{
        this.$router.push('/')
      }
    }
  }
}
</script>

