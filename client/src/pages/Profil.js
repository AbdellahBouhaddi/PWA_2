import React, { useContext, useEffect, useState } from 'react'
import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/Profil/UpdateProfil'

import { isEmpty } from '../components/Utils'

import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Post/Card'
import FollowHandler from '../components/Profil/FollowHandler'
import FriendsHint from '../components/Profil/FriendsHint'
import { deleteUSer, deleteUsers, getUser } from '../actions/user.actions'
import { deleteUsers2, getUsers } from '../actions/users.actions'
import { store } from '..'
const Profil = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const supprimerCompte = (id) => {
    if (id !== null) {
      dispatch(deleteUsers2(id))
      setIsLoading(true)
      store.dispatch(getUsers())
      store.dispatch(getUsers())
    }
  }
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const posts = useSelector((state) => state.allPostReducer)

  useEffect(() => {
    isEmpty(usersData[0]) && setIsLoading(true)
  }, [usersData, store])

  return (
    <div className="profil-page">
      {uid && !isEmpty(usersData[0]) ? (
        <>
          <UpdateProfil />

          {userData.typeCompte !== 'admin' ? (
            <div className="posst-container">
              <div className="main">
                <div className="thread-container">
                  <ul>
                    {!isEmpty(posts[0]) &&
                      posts.map((post) => {
                        if (post.posterId === uid)
                          return <Card id={uid} post={post} key={post._id} />
                      })}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="get-friends-container">
                <button
                  className="btn"
                  onClick={() => store.dispatch(getUsers())}
                >
                  refreche
                </button>
                <ul>
                  {isLoading ? (
                    <>
                      {usersData &&
                        usersData.map((user) => {
                          for (let j = 0; j < usersData.length; j++) {
                            //if (userData._id !== user._id) {
                            return (
                              <li className="user-hint" key={user}>
                                <img src={user.picture} alt="user-pic" />
                                <p>{user.psuedo}</p>
                                <i>{user.typeCompte}</i>
                                {userData._id !== user._id && (
                                  <button
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          'voulez-vous supprimer ce compte ?'
                                        )
                                      ) {
                                        setIsLoading(false)
                                        supprimerCompte(user._id)
                                      }
                                    }}
                                    className="btn"
                                  >
                                    delete
                                  </button>
                                )}

                                {user.typeCompte === 'commercon' && (
                                  <FollowHandler
                                    idToFollow={user._id}
                                    type={'suggestion'}
                                  />
                                )}
                              </li>
                            )
                            //}
                          }
                        })}
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profil
