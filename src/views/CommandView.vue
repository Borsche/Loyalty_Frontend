<script setup>
import { CommandAPI } from "@/endpoints";
</script>
<template>
  <div class="commands">
    <div v-for="(commands, gameName) in commandsForGame" v-bind:key="gameName">
      <input class="game_name" :id="'game_' + gameName" type="checkbox" />
      <label :for="'game_' + gameName">
        {{ gameName }}
      </label>
      <div class="game_commands">
        <div class="command" v-for="command in commands" v-bind:key="command.id">
          <h2>{{ command.title }}</h2>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      commandsForGame: {},
    };
  },
  async mounted() {
    // request commands
    this.commandsForGame = (await CommandAPI.getCommands()).data;
  },
};
</script>

<style>
.commands {
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
}

.command {
  min-width: 300px;
  max-width: 100vw;
  height: 200px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.568);
  margin: 10px;
  text-align: center;
  transition: 0.5s;
  overflow: hidden;
}

.game_name {
  opacity: 0;
}

.game_name:checked ~ label {
}

.game_name ~ label {
  font-size: 2rem;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.game_name ~ label::after {
  content: "";
}

.game_name:checked ~ .game_commands .command {
  height: 0px;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}

hr {
  width: 80%;
  text-align: center;
  margin-left: 10%;
  border-color: rgba(255, 255, 255, 0.568);
}

@media (min-width: 1024px) {
  .game_commands {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
