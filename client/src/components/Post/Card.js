import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../actions/post.actions'
import FollowHandler from '../Profil/FollowHandler'
import { dateParser, isEmpty } from '../Utils'
import CardComments from './CardComments'
import DeleteCard from './DeleteCard'
import LikeButton from './LikeButton'

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true)
  const usersData = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(post.message)
  const [avUpdate, setAvUpdate] = useState(post.prixAv)
  const [apUpdate, setApUpdate] = useState(post.prixAp)
  const [showComments, setShowComments] = useState(false)

  const updateItem = () => {
    if (textUpdate || avUpdate || apUpdate) {
      if (avUpdate !== '' && apUpdate !== '') {
        dispatch(updatePost(post._id, textUpdate, avUpdate, apUpdate))

        setIsUpdated(false)
      } else alert('voulez entrer les deux prix ?')
    }
  }

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false)
  }, [usersData])

  return (
    <div className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture
                    else return null
                  })
                  .join('')
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.psuedo
                        else return null
                      })
                      .join('')}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type="card" />
                )}
              </div>
              <span>{dateParser(post.createdAt)} </span>
            </div>
            {isUpdated === false && (
              <>
                {' '}
                <p> {post.message}</p>
                <div className="prix">
                  <p className="prixx">
                    {' '}
                    {'Prix avant : ' + post.prixAv + ' DA'}
                  </p>
                  <p className="prixx">
                    {' '}
                    {'Prix aprés : ' + post.prixAp + ' DA'}
                  </p>
                  <br />
                </div>{' '}
                <div className="prixxx">
                  <p className="">
                    {' '}
                    <img src="./img/icons/hd.png" alt="edit" height={25} />
                    {'     ' + post.localisation}
                  </p>
                  <p className="">
                    {' '}
                    <img src="./img/icons/phone.png" alt="edit" height={25} />
                    {'       ' + post.numero}
                  </p>
                </div>
              </>
            )}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                ></textarea>
                <input
                  className="prixx"
                  type="number"
                  defaultValue={post.prixAv}
                  onChange={(e) => setAvUpdate(e.target.value)}
                ></input>
                <input
                  className="prixx"
                  type="number"
                  defaultValue={post.prixAp}
                  onChange={(e) => setApUpdate(e.target.value)}
                ></input>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    valider modification
                  </button>
                </div>
              </div>
            )}

            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}

            {userData._id === post.posterId ||
            userData.typeCompte === 'admin' ? (
              <>
                <div className="button-container">
                  <div onClick={(e) => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>{post.comments.length}</span>
              </div>

              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
