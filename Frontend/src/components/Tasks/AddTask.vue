<template>
  <form class="container w-50 border border-2 rounded p-3" @submit="addTask">
    <h1>Add Task</h1>
    <div class="mb-3">
      <label for="" class="form-label h3">Title</label>
      <input
        type="text"
        class="form-control text-center"
        placeholder="Enter Title"
        name="title"
        v-model="title"
      />
    </div>
    <div class="mb-3">
      <label class="form-label h3">Description</label>
      <textarea
        type="text"
        class="form-control text-center"
        name="description"
        v-model="description"
      ></textarea>
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id=""
          name="reminder"
          v-model="reminder"
        />
        <label class="form-check-label" for=""> Reminder </label>
      </div>
    </div>
    <input
      type="submit"
      value="Add Task"
      class="btn btn-primary btn-block w-100"
    />
  </form>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      title: "",
      description: "",
      reminder: false,
    };
  },
  methods: {
    addTask(e) {
      e.preventDefault();
      const newTask = {
        title: this.title,
        description: this.description,
        reminder: this.reminder,
      };
      this.$emit("add-task", newTask);
    },
  },
};
</script>
