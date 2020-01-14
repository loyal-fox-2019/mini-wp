<template>
  <div id="main-div">
    <section id="text-info">
      <h1><strong>Welcome to HotBLOG</strong></h1>
      <div class="title">
        <span class="title-1">Create, read, and </span>
        <span class="title-2">share article for free!</span>
      </div>
    </section>
    <section id="articles"></section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

p {
  color: white;
  text-align: center;
  font-size: 3rem;
  border-radius: 3rem;
  margin: 0%;
  padding: 0;
  background: rgba(0,0,0,0.6);
  
}

.title {
  color: white;
  text-align: center;
  border-radius: 10px;
  background: rgba(0,0,0,0.6);
  font-size: 2em;
  width: 25vw;
  position: absolute;
  left: 50%;
  transform: translate(-50%,0)
}
.title-1, .title-2 {
  display: block
}

hr {
  margin-top: 0;
  padding: 0;
  width: 50vw;
  margin-bottom: 2em;
  border: 1px solid black;
}

#text-info {
  padding-top: 12rem;
  text-align: center;
}

h1 {
  font-size: 5em;
  color: #007bff;
  font-family: 'Rubik', sans-serif;
  text-shadow: 5px 5px black;
}

#main-div {
  position: relative;
  width: 100vw;
  height: 90vh;
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-top: 11px;
}
</style>