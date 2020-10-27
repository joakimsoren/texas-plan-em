<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
  background-color: $te-white-dark;
  body {
    height: 100%;
    font-family: "Bellota Text", cursive;

    #app {
      height: 100%;
    }
    
    input { 
      padding: 0.5rem;
      font-size: 1.2rem;
      border-radius: 3px;
      outline: none;
      border: 1px solid #eaeaea;

    }

    button {
      padding: 0.5rem 1rem;
      background-color: $te-primary;
      border: solid 1px $te-primary-dark;
      box-shadow: $te-box-shadow-light;
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      transition: background-color 0.2s ease-in;
      &:focus {
        outline: none;
      }
      &:hover {
        background-color: $te-primary-light;
        border-color: $te-primary;
      }
      cursor: pointer;
    }
  }
}
</style>
