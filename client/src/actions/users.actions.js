import axios from 'axios'

export const GET_USERS = 'GET_USERS'
export const DELETE_USER2 = 'DELETE_USER'

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteUsers2 = (userId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
    })
      .then((res) => {
        dispatch({
          type: DELETE_USER2,
          payload: { userId },
        })
      })

      .catch((err) => console.log(err))
  }
}
