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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';

    #app {
      height: 100%;
    }

    h2 {
      font-size: 14px;
      font-weight: 400;
      margin: 16px 0;
      color: rgba(59, 59, 59, 1);
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
      &:disabled {
        cursor: default;
        opacity: 0.55;
        transition: none;
        &:hover {
          background-color: $te-primary;
          border-color: $te-box-shadow-light;
        }
      }
    }
  }
}
</style>
