<script setup>
import { CommandAPI } from "@/endpoints";
import { useUserInfoStore } from "@/stores/userInfo";

import CommandBox from "@/components/CommandBox.vue";
</script>
<template>
  <div class="commands">
    <div v-if="canToggleEdit" class="commands_edit_mode_toggle">
      <h2 v-if="commandsEditMode">Active</h2>
      <h2 v-else>Inactive</h2>
      <button @click="commandsEditMode = !commandsEditMode"><h2>Edit Mode</h2></button>
    </div>
    <div v-for="(commands, gameName) in commandsForGame" v-bind:key="gameName">
      <input class="game_name" :id="'game_' + gameName" type="checkbox" />
      <label :for="'game_' + gameName">
        {{ gameName }}
      </label>
      <div class="game_commands">
        <CommandBox
          v-for="command in commands"
          v-bind:key="command.id"
          :command="command"
          :canToggleMode="commandsEditMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CommandBox,
  },
  data: () => {
    return {
      commandsForGame: {},
      commandsEditMode: false,
    };
  },
  computed: {
    canToggleEdit() {
      const userStore = useUserInfoStore();
      return userStore.getUserInfo.role === "OWNER";
    },
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

.commands_edit_mode_toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.commands_edit_mode_toggle button {
  margin-left: 10px;
  border: none;
  cursor: pointer;
  background-color: rgba(48, 48, 48, 0.377);
  color: var(--color-text);
}

.game_name {
  opacity: 0;
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

.commands hr {
  width: 60%;
}

.game_name:checked ~ .game_commands > .command {
  height: 0px;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.game_name_wrapper {
  display: flex;
  align-items: baseline;
}

.game_name_wrapper > span {
  margin: 10px;
}

.game_name ~ span {
  margin-left: 20px;
}

@media (min-width: 1024px) {
  .commands > div {
    width: 1024px;
  }

  .commands {
    display: flex;
    align-items: center;
  }

  .game_commands {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 1024px;
  }
}
</style>