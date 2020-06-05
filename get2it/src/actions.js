import axios from 'axios'
import moment from 'moment'

export const CREATE_USER_START = 'CREATE_USER_START'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const GET_TASKS_START = 'GET_TASKS_START'
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const GET_TASKS_FAILED = 'GET_TASKS_FAILED'

export const UPDATE_TASK_START = 'UPDATE_TASK_START'
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
export const UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED'

export const DELETE_TASK_START = "DELETE_TASK_START";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILED = "DELETE_TASK_FAILED";

export const UPDATE_USER_START = 'UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

export const CREATE_TASK_START = "CREATE_TASK_START";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILED = "CREATE_TASK_FAILED";

export const NEW_TASK_DATE = 'NEW_TASK_DATE'
export const NEW_START_TIME = 'NEW_START_TIME'
export const NEW_END_TIME = 'NEW_END_TIME'


export function createUser(username, password) {
  return (dispatch) => {
    dispatch({ type: CREATE_USER_START })

    return axios.post('https://get2it.herokuapp.com/auth/register', { username, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
          dispatch({ type: CREATE_USER_SUCCESS, payload: res.data.user })
      })
      .catch((err) => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: CREATE_USER_FAILED, payload })
      })
  }
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({ type: LOGIN_START })

    return axios.post('https://get2it.herokuapp.com/auth/login', { username, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
      })
      .catch((err) => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: LOGIN_FAILED, payload })
      })
  }
}

export function getTASKS(id) {
  return (dispatch) => {
    dispatch({ type: GET_TASKS_START })

    const headers = {
      Authorization: localStorage.getItem('token'),
    }

    axios.get(`https://get2it.herokuapp.com/users/${id}/tasks`, { headers })
      .then((res) => {
        console.log(res)
        const newRes = res.data.map(task => {
          if (!task.status) {
            return {
              ...task,
              status: false,
              date: moment(task.date).add(1,'day').format('L')
            }
          }else {
            return {
              ...task,
              date: moment(task.date).add(1, "day").format("L")
            };
          }
        })
        dispatch({ type: GET_TASKS_SUCCESS, payload: newRes})
      })
      .catch((err) => {
        console.log(err.response)
        dispatch({ type: GET_TASKS_FAILED, payload: err.response })
      })
  }
}

export function updateTask(payload, id){
  return (dispatch) => {
    dispatch({ type: UPDATE_TASK_START })

    const headers = {
      Authorization: localStorage.getItem('token'),
    }

    axios.put(`https://get2it.herokuapp.com/users/tasks/${id}`, payload, { headers })
      .then((res) => {
        console.log(payload)
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: res.data })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: UPDATE_TASK_FAILED, payload: err.response })
      })
  }
}

export function deleteTask(id) {
  return dispatch => {
    dispatch({ type: DELETE_TASK_START });
    console.log(id)

    const headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .delete(`https://get2it.herokuapp.com/users/tasks/${id}`, { headers })
      .then(res => {
        dispatch({ type: DELETE_TASK_SUCCESS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: DELETE_TASK_FAILED, payload: err.response.data });
      });
  };
}

export function updateUser(payload, id) {
  return dispatch => {
    dispatch({ type: UPDATE_USER_START });

    const headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .put(`https://get2it.herokuapp.com/auth/edit-profile/${id}`, payload, { headers })
      .then(res => {
          dispatch({ type: UPDATE_USER_SUCCESS, payload: payload, id: id });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: UPDATE_USER_FAILED, payload: err.response.data });
      });
  };
}

export function createTask(payload, id) {
  return dispatch => {
    dispatch({ type: CREATE_TASK_START });

    const headers = {
      Authorization: localStorage.getItem("token")
    };

    return axios
      .post(`https://get2it.herokuapp.com/users/${id}/tasks`, payload, { headers })
      .then(res => {
          dispatch({ type: CREATE_TASK_SUCCESS, payload: payload, id: id });
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err;
        dispatch({ type: CREATE_TASK_FAILED, payload });
      });
  };
}

export function newTaskDate(date) {
  return {
    type: NEW_TASK_DATE,
    payload: date
  }
}

export function newStartTime(time) {
  return {
    type: NEW_START_TIME,
    payload: time
  }
}

export function newEndTime(time) {
  return {
    type: NEW_END_TIME,
    payload: time
  }
}
