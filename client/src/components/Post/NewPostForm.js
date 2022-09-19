import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addPosts, getPosts } from '../../actions/post.actions'
import { isEmpty, timestampParser } from '../Utils'

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [prixAv, setprixAv] = useState('')
  const [prixAp, setprixAp] = useState('')
  const [typeProduit, setTypeProduit] = useState('')
  const [dateexpiration, setDateExpiration] = useState('')
  const [postPicture, setPOstPicture] = useState(null)
  const [video, setVideo] = useState('')
  const [file, setFile] = useState()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)
  const error = useSelector((state) => state.errorReducer.postErrors)

  const handlePicture = (e) => {
    setPOstPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
    setVideo('')
  }
  const handlePost = async () => {
    if (prixAv && prixAp && postPicture) {
      const data = new FormData()
      data.append('posterId', userData._id)
      data.append('message', message)
      data.append('prixAv', prixAv)
      data.append('prixAp', prixAp)
      data.append('localisation', userData.localisation)
      data.append('numero', userData.numero)
      data.append('TypeProduit', typeProduit)
      data.append('dateexpiration', dateexpiration)
      if (file) data.append('file', file)
      await dispatch(addPosts(data))
      dispatch(getPosts())
      cancelPost()
    } else alert('Veullez entrer la photo et les deux prix ')
  }
  const cancelPost = () => {
    setMessage('')
    setprixAp('')
    setprixAv('')
    setPOstPicture('')
    setVideo('')
    setFile('')
    setTypeProduit('')
    setDateExpiration('')
  }
  const handleVideo = () => {
    let findLink = message.split(' ')
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes('https://') ||
        findLink[i].includes('www.') ||
        findLink[i].includes('web.')
      ) {
        findLink.splice(i, 1)
        setVideo('')
        setMessage(findLink.join(' '))
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
    handleVideo()
  }, [userData, message, video])

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{' '}
              Abonnement
              {userData.following && userData.following.length > 1 ? 's' : ''}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{' '}
              Abonné
              {userData.followers && userData.followers.length > 1 ? 's' : ''}
            </p>
          </div>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <input
              className="inputprix"
              type="number"
              Value={prixAv}
              placeholder="Prix Avant"
              onChange={(e) => setprixAv(e.target.value)}
            ></input>

            <input
              className="inputprix"
              type="number"
              Value={prixAp}
              placeholder="Prix Aprés"
              onChange={(e) => setprixAp(e.target.value)}
            ></input>

            <input
              className="TypeProduit"
              type="text"
              id="TypeProduit"
              Value={typeProduit}
              placeholder="c'est quoi la categorie du produit"
              onChange={(e) => setTypeProduit(e.target.value)}
              value={typeProduit}
            />
            <input
              className="TypeProduit"
              type="text"
              id="dateexpiration"
              Value={dateexpiration}
              placeholder="Date d'expiration jj/mm/aaaa"
              onChange={(e) => setDateExpiration(e.target.value)}
              value={dateexpiration}
            />
            {prixAv || prixAp || message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.psuedo} </h3>
                    </div>
                    <span>{timestampParser(Date.now())} </span>
                  </div>
                  <div className="content">
                    <p>{message} </p>
                    <div className="prixx">
                      {prixAv ? (
                        <p> Prix Avant : {prixAv} DA</p>
                      ) : (
                        <p> Prix Avant : 0 DA</p>
                      )}
                      {prixAp ? (
                        <p> Prix Aprés : {prixAp} DA</p>
                      ) : (
                        <p> Prix Aprés : 0 DA</p>
                      )}
                    </div>
                    <div className="prixxx">
                      <p>Localisation : {userData.localisation}</p>
                      <p>numero : {userData.numero}</p>
                    </div>

                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="picture" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg , .png"
                      onChange={handlePicture}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo('')}>supprimer video</button>
                )}
              </div>
              {!isEmpty(error.format) && <p>{error.format} </p>}
              {!isEmpty(error.maxSize) && <p>{error.MaxSize} </p>}
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    {' '}
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  {' '}
                  envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NewPostForm
