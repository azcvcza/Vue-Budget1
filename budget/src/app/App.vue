<template>
  <div id="app" class="tile is-ancestor" >
    <div class="tile is-parent">
      
      <div class="tile is-child is-4">
        <div class="tile is-child notification is-light">
          <p class="title">budgeterbium</p>
       <img src="../assets/logo.png">
        <img src="../assets/logo.png">
        </div>
        <navigation class="tile is-child notification is-text"></navigation>
        
      </div>
      <div class="tile is-child notification is-warning">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation } from './navigation/components';
export default {
  name: 'app',
  components: {
    Navigation
  }
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

</style>
