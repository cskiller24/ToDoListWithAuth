<template>
  <div class="tasks container mt-5">
    <div class="border border-3 rounded py-4">
      <h1>Tasks</h1>
      <div v-if="tasks.length != 0">
        <div
          class="border mx-4 bg-light rounded row p-3 mb-3"
          v-for="(task, index) in tasks"
          :key="index"
        >
          <div class="col-8 task-title">
            {{ task.title }}
          </div>
          <div class="col">
            <div
              :class="task.reminder ? 'btn btn-success' : 'btn btn-danger'"
              @dblclick="
                toggleReminder(task);
                task.reminder = !task.reminder;
              "
            >
              Reminder
            </div>
          </div>
          <div class="col view-option">
            <a
              class="btn btn-primary btn-block w-100"
              :href="`/task/${task.uuid}`"
              >View</a
            >
          </div>
        </div>
      </div>
      <h2 v-else class="mt-3">No Task</h2>
    </div>
    <div class="my-3">
      <button @click="showAddTask" class="btn btn-primary btn-block w-100 mb-3">
        {{ ButtonAddTask }}
      </button>
      <AddTask v-if="this.AddTask" @add-task="addTaskForm" />
    </div>
    <button @click="consoleTask"></button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AddTask from "../../components/Tasks/AddTask.vue";

export default {
  name: "Tasks",
  components: {
    AddTask,
  },
  data() {
    return {
      AddTask: false,
      ButtonAddTask: "Add Task",
    };
  },
  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    showAddTask() {
      console.log(this.tasks.length);
      this.AddTask = !this.AddTask;
      this.AddTask
        ? (this.ButtonAddTask = "Close")
        : (this.ButtonAddTask = "Add Task");
    },
    addTaskForm(task) {
      this.$store.dispatch("ADD_TASK", task);
    },
    toggleReminder(task) {
      const data = {
        uuid: task.uuid,
        title: task.title,
        description: task.description,
        reminder: !task.reminder,
      };
      this.$store.dispatch("UPDATE_TASK", data);
    },
    ...mapMutations(["consoleTask"]),
  },
  created() {
    this.$store.dispatch("GET_TASKS");
  },
};
</script>

<style>
.reminder {
  background: black;
}
</style>
