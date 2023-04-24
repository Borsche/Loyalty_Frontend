<script setup></script>
<template>
  <div class="command">
    <div>
      <input v-if="isEditMode" class="command_title_edit" :value="command.title" />
      <h2 v-else>{{ command.title }}</h2>
      <pencil-icon
        v-if="canToggleMode && !editMode"
        class="command_edit_toggle"
        @click="editMode = true"
      />
      <hr />
    </div>
    <div>
      <textarea
        v-if="isEditMode"
        class="command_desc_edit"
        cols="40"
        rows="5"
        :value="command.description"
      />
      <span v-else class="command_desc">{{ command.description }}</span>
    </div>
    <div>
      <hr />
      <div class="command_add_infos">
        <label v-if="isEditMode">Cost:</label>
        <input
          v-if="isEditMode"
          class="command_add_infos_cost_edit"
          type="number"
          :value="command.cost"
        />
        <span v-else class="command_cost">Cost: {{ command.cost }}</span>

        <label v-if="isEditMode">Cooldown:</label>
        <input
          v-if="isEditMode"
          class="command_add_infos_cooldown_edit"
          type="number"
          :value="command.cooldown"
        />
        <span v-else class="command_cooldown">Cooldown: {{ command.cooldown }}</span>
      </div>
      <div v-if="isEditMode">
        <check-icon />
        <close-icon />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {};
  },
  props: {
    command: {},
    canToggleMode: Boolean,
  },
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    isEditMode() {
      return this.canToggleMode && this.editMode;
    },
  },
  watch: {
    canToggleMode() {
      if (!this.canToggleMode) this.editMode = false;
    },
  },
  mounted() {},
};
</script>

<style>
.command {
  min-width: 300px;
  max-width: 100vw;
  height: 200px;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 10px;
  text-align: center;
  transition: 0.5s;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.command_add_infos {
  display: flex;
  justify-content: space-evenly;
}

.command_edit_toggle {
  position: absolute;
  top: 5px;
  right: 10px;
}

.command hr {
  width: 80% !important;
}

.command_title_edit {
  font-size: 1.4rem;
  line-height: 1.5;
  width: 85%;
  text-align: center;
}

.command_desc_edit {
  line-height: 1.4;
  font-size: 15px;
  width: 95%;
}

.command_add_infos input {
  width: 20%;
}

.command textarea,
.command input {
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  outline: none;
  border-radius: 5px;
  appearance: none;
}

.command input::-webkit-outer-spin-button,
.command input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.command input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

.command span,
.command h2 {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

@media (min-width: 1024px) {
  .command {
    flex-basis: 30%;
  }
}
</style>