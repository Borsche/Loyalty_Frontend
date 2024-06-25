<script setup>
import { CommandAPI } from '@/endpoints'
</script>
<template>
    <div
        :class="isBeingDragged ? 'command drag' : 'command'"
        :draggable="canToggleMode"
        :ondragstart="drag"
    >
        <div class="command_title">
            <close-icon v-if="canToggleMode && !editMode" @click="deleteCommand" />
            <input v-if="isEditMode" class="command_title_edit" v-model="commandData.title" />
            <h2 v-else>{{ commandData.title }}</h2>
            <pencil-icon v-if="canToggleMode && !editMode" @click="editMode = true" />
            <div class="command_edit_control" v-if="isEditMode">
                <check-icon @click="confirmCommand" />
                <close-icon @click="editMode = false" />
            </div>
            <hr />
        </div>
        <div>
            <!--drag-icon
        v-if="canToggleMode && !editMode"
        class="command_edit_drag_icon"
        @mousedown="startDrag"
      /-->
            <textarea
                v-if="isEditMode"
                class="command_desc_edit"
                cols="40"
                rows="5"
                v-model="commandData.description"
            />
            <span v-else class="command_desc">{{ commandData.description }}</span>
        </div>
        <div>
            <hr />
            <div class="command_add_infos">
                <label v-if="isEditMode">Cost:</label>
                <input
                    v-if="isEditMode"
                    class="command_add_infos_cost_edit"
                    type="number"
                    v-model="commandData.cost"
                />
                <span v-else class="command_cost">Cost: {{ commandData.cost }}</span>

                <label v-if="isEditMode">Cooldown:</label>
                <input
                    v-if="isEditMode"
                    class="command_add_infos_cooldown_edit"
                    type="number"
                    v-model="commandData.cooldown"
                />
                <span v-else class="command_cooldown">Cooldown: {{ commandData.cooldown }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {}
    },
    props: {
        command: {},
        canToggleMode: Boolean,
        newlyAdded: Boolean
    },
    data() {
        return {
            editMode: this.newlyAdded,
            isNew: this.newlyAdded,
            commandData: this.command
        }
    },
    computed: {
        isEditMode() {
            return this.canToggleMode && this.editMode
        }
    },
    watch: {
        canToggleMode() {
            if (!this.canToggleMode) this.editMode = false
        },
        command() {
            this.commandData = this.command
        }
    },
    methods: {
        async updateCommand() {
            try {
                await CommandAPI.updateCommand(this.commandData)
                this.editMode = false
            } catch (e) {
                console.log(e)
            }
        },
        async addNewCommand() {
            try {
                const reponse = await CommandAPI.addCommand(this.commandData)
                this.commandData = reponse.data
                this.editMode = false
                this.isNew = false
                this.$emit('added')
            } catch (e) {
                console.log(e)
            }
        },
        async deleteCommand() {
            try {
                await CommandAPI.deleteCommand(this.commandData.id)
                this.$emit('deleted')
            } catch (e) {
                console.log(e)
            }
        },
        async confirmCommand() {
            if (this.isNew) {
                this.addNewCommand()
            } else {
                this.updateCommand()
            }
        },
        drag(event) {
            event.dataTransfer.setData('dragCommand', JSON.stringify(this.commandData))
        }
    },
    mounted() {}
}
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

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.command_add_infos {
    display: flex;
    justify-content: space-evenly;
}

.command_title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-end;
    padding-left: 10px;
    padding-right: 10px;
}

.command_title > hr::before {
    flex-basis: 100%;
    width: 0;
}

.command_edit_toggle.left {
    position: absolute;
    top: 5px;
    left: 10px;
}

.command hr {
    width: 80%;
    flex-basis: 100%;
    margin: auto;
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
    width: 80%;
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

.command input[type='number'] {
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

.command_edit_control {
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 200px;
    left: 3px;
    top: 0;
    justify-content: space-evenly;
    z-index: 1;
}

.command_edit_drag_icon {
    position: absolute;
    left: 0;
    cursor: move;
}

@media (min-width: 1024px) {
    .command {
        flex-basis: 30%;
    }
}
</style>
