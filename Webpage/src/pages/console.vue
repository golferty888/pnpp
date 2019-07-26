
  <template>
  <div class="console">
    <navbar/>
    <appliance/> 
  </div>
  </template>

  <script>
  import navbar from '../components/home_navbar'
  import appliance from '../components/appliance'
  export default {
    components:{
        navbar,
        appliance
    }
  }
  </script>

  <style>
  /* Up to you */
  </style>
  