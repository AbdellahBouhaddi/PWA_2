import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../Utils'
import FollowHandler from './FollowHandler'

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [playOnce, setPlayOnce] = useState(true)
  const [friendsHint, setFriendsHint] = useState([])
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)

  useEffect(() => {
    const notFriendList = () => {
      let array = []
      usersData.map((user) => {
        if (
          user._id !== userData._id &&
          !user.followers.includes(userData._id) &&
          user.typeCompte === 'commercon'
        )
          return array.push(user._id)
      })
      array.sort(() => 0.5 - Math.random())
      array.length = 15
      setFriendsHint(array)
    }

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList()
      setIsLoading(false)
      setPlayOnce(false)
    }
  }, [usersData, userData, playOnce])

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic" />
                      <p>{usersData[i].psuedo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={'suggestion'}
                      />
                    </li>
                  )
                }
              }
            })}
        </ul>
      )}
    </div>
  )
}

export default FriendsHint
