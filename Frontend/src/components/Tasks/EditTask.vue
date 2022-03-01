<template>
  <form class="container border border-dark border-2 rounded p-3" @submit="editTask">
    <h1>Edit Task</h1>
    <div class="mb-3">
      <label for="" class="form-label h3">Title</label>
      <input type="text" class="form-control text-center" name="title" v-model="title">
    </div>
    <div class="mb-3">
      <label for="" class="form-label h3">Description</label>
      <textarea type="text" class="form-control text-center" name="description" v-model="description"></textarea>
    </div>
    <input type="submit" value="Edit Task" class="btn btn-primary btn-block w-100">
  </form>
</template>

<script>

export default {
  name: 'EditTask',
  data(){
    return {
      title: '',
      description: '',
      reminder: false
    }
  },
  props: {
    task : {
      required: true,
      type: Object
    }
  },
  methods: {
    editTask(e) {
      e.preventDefault()
      const task = {
        uuid: this.task.uuid,
        title: this.title,
        description: this.description,
        reminder: this.reminder
      }
      this.$emit('update-task', task)
      this.$store.dispatch('UPDATE_TASK', task)
    }
  },
  created() {
    this.title = this.task.title
    this.description = this.task.description
    this.reminder = this.task.reminder
  }
}
</script>