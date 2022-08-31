import axios from 'axios'
import cookie from 'js-cookie'
export const GET_USER = 'GET_USER'
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE'
export const UPDATE_BIO = 'UPDATE_BIO'
export const FOLLOW_USER = 'FOLLOW_USER'
export const UNFOLLOW_USER = 'UNFOLLOW_USER'
export const GET_USER_ERRORS = 'GET_USER_ERRORS'
export const DELETE_USER = 'DELETE_USER'

const removeCookie = (key) => {
  if (window !== 'undifined') {
    cookie.remove(key, { expires: 1 })
  }
}

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors })
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: '' })
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
            })
        }
      })
      .catch((err) => console.log(err))
  }
}

export const updateBio = (userId, bio, numero, localisation) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio, numero, localisation },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: { bio, numero, localisation } })
      })
      .catch((err) => console.log(err))
  }
}

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } })
      })
      .catch((err) => console.log(err))
  }
}

export const unfollowUser = (followerId, idTounFollow) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idTounFollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idTounFollow } })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteUSer = (userId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
    })
      .then((res) => {
        dispatch({
          type: DELETE_USER,
          payload: { userId },
        })
        removeCookie('jwt')
      })

      .catch((err) => console.log(err))
  }
}
export const deleteUsers = (userId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
    })
      .then((res) => {
        dispatch({
          type: DELETE_USER,
          payload: { userId },
        })
      })

      .catch((err) => console.log(err))
  }
}
