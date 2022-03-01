<template>
  <div class="border border-3 container mt-5 p-3" v-if="dataFetched">
    <router-link to="/tasks">Return to tasks</router-link>
    <h1 v-if="task[0].title">{{ task[0].title }}</h1>
    <div class="border rounded row py-3 m-3">
      <div class="col-8" v-if="task[0].title">
        {{ task[0].description }}
      </div>
        <div class="col edit-option">
          <div class="btn btn-primary btn-block w-100" @click="showEdit = true" v-show="!showEdit">Edit</div>
        </div>
        <div class="col delete-option">
          <div class="btn btn-primary btn-danger w-100" @click="doneTask">Delete</div>
        </div>
    </div>
    <div class="btn btn-block w-100 btn-outline-primary mb-3" @click="showEdit = false" v-show="showEdit">Close</div>
    <EditTask :task="task[0]" v-if="showEdit" @update-task="clientUpdate" />
  </div>
</template>

<script>
import EditTask from '../../components/Tasks/EditTask.vue'
export default {
  name: 'Task',
  components: {
    EditTask
  },
  data() {
    return {
      dataFetched: false,
      task: [],
      showEdit: false
    }
  },
  emits: ['update-task'],
  methods: {
    doneTask() {
      if(confirm('Are you sure?')) {
        const uuid = {
          uuid: this.$route.params.uuid
        }
        this.$store.dispatch('DELETE_TASK', uuid)
      }
    },
    clientUpdate(task) {
      this.showEdit = false
      this.task[0] = task
    }
  },
  async created() {
    this.task = await this.$store.dispatch('GET_TASK', this.$route.params.uuid)
    this.dataFetched = true
  },
}
</script>