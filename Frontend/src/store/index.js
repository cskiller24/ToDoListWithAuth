import axiosClient from '../axios'
import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    tasks: [],
    task: [],
  },
  actions: {
    register(context, data) {
      return axiosClient.post("/register", data).then(() => {
        router.push({ name: "Login" });
      });
    },
    login({ commit }, data) {
      return axiosClient
        .post("/login", data)
        .then(({ data }) => {
          commit("login", data);
        })
        .catch((error) => {
          console.log(error.response.data);
          //TODO
        });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then(() => {
        commit("logout");
      });
    },
    GET_TASKS({commit, state}) {
      if(state.tasks.length === 0) {
        return axiosClient.get("/tasks").then(({ data }) => {
          commit("setTasks", data);
        });
      }
    },
    GET_TASK(context, id) {
      return axiosClient.get(`/task/${id}`).then((res) => {
        return res.data;
      });
    },
    ADD_TASK({ commit }, data) {
      return axiosClient
        .post("/task/create", data)
        .then(({data}) => {
          const newData = {
            uuid: data.uuid,
            title: data.title,
            description: data.description,
            reminder: data.reminder
          }
          commit('addTask', newData)
        });
    },
    UPDATE_TASK({commit}, data) {
      return axiosClient.put('/task/update', data)
      .then(() => {
        commit('updateTask', data)
      })
    },
    DELETE_TASK({ commit }, data) {
      console.log(data);
      return axiosClient.delete('/task/delete', {data: data})
      .then(() => {
        commit('deleteTask', data)
      })
    },
  },
  mutations: {
    login: (state, user) => {
      state.user.token = user.token;
      state.user.data = user.user;
      sessionStorage.setItem("TOKEN", user.token);
      router.push({ name: "Tasks" });
    },
    logout: (state) => {
      state.user.data = {};
      state.tasks = [];
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
      router.push({ name: "Login" });
    },
    addTask(state, payload) {
      console.log(payload)
      state.tasks.push(payload);
    },
    setTasks: (state, payload) => {
      state.tasks = payload;
    },
    updateTask: (state, payload) => {
      state.task = state.task.map((task) =>
        task.id === payload.id ? {...task, title: payload.title, description: payload.description, reminder: payload.reminder} : task
      )
    },
    deleteTask(state, payload) {
      state.task = state.task.filter((task) => task.uuid === payload.uuid)
      router.push({name: 'Tasks'})
    },
    consoleTask: (state) => {
      console.log(state.user.token);
    },
  },
  getters: {
    allTasks: (state) => () => {
      return state.tasks;
    },
    test: (state, uuid) => {
      return console.log("test", state, uuid);
    },
  },
});
