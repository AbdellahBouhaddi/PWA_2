import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getsTrends } from '../actions/post.actions'
import { isEmpty } from './Utils'

const Trends = () => {
  const posts = useSelector((state) => state.allPostReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const trendList = useSelector((state) => state.trendingReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i])
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length
      })
      sortedArray.length = 20
      dispatch(getsTrends(sortedArray))
    }
  }, [posts, dispatch])
  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact to="trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div className="">
                    <img
                      src={
                        usersData[0] &&
                        usersData
                          .map((user) => {
                            if (user._id === post.posterId) {
                              return user.picture
                            } else return null
                          })
                          .join('')
                      }
                      alt="profil-pic"
                    />
                  </div>
                  <div className="trend-content">
                    <p>{post.message}</p>
                    <span>lire</span>
                  </div>
                </li>
              )
            })}
        </ul>
      </NavLink>
    </div>
  )
}

export default Trends
