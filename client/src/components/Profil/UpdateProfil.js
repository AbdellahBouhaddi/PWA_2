import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteUSer, updateBio } from '../../actions/user.actions'
import LeftNav from '../LeftNav'
import Logout from '../Log/Logout'
import { dateParser, isEmpty } from '../Utils'
import FollowHandler from './FollowHandler'
import UploadImg from './UploadImg'

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const error = useSelector((state) => state.errorReducer.userErrors)

  const [bio, setBio] = useState(userData.bio)
  const [numero, setNumero] = useState(userData.numero)
  const [localisation, setLocalisation] = useState(userData.localisation)
  const [updateForm, setUpdateForm] = useState(false)
  const dispatch = useDispatch()
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)
  const [suppcompt, setSuppcompt] = useState(false)

  const supprimerCompte = (id) => {
    setSuppcompt(true)
    dispatch(deleteUSer(id))
    window.location = '/'
  }
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio, numero, localisation))

    setUpdateForm(false)
  }
  useEffect(() => {}, [userData, suppcompt])

  return (
    <div className="profil-page">
      <LeftNav />
      <h1>profile de {userData.psuedo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          {userData.typeCompte !== 'admin' && (
            <div className="right-part">
              <div className="bio-update">
                <h5
                  onClick={() => {
                    if (
                      window.confirm(
                        'voulez-vous vraiment supprimer ce compte ?'
                      )
                    ) {
                      supprimerCompte(userData._id)
                    }
                  }}
                >
                  supprimer le compte
                </h5>
              </div>
            </div>
          )}

          <p>{error.maxSize} </p>
          <p>{error.format} </p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            {updateForm === false && (
              <>
                {userData.typeCompte === 'commercon' ||
                userData.typeCompte === 'admin' ? (
                  <>
                    <p>Numero : {userData.localisation}</p>
                    <p>Localisation : {userData.numero}</p>
                  </>
                ) : (
                  <></>
                )}
                <h3>Bio</h3>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {' '}
                  {userData.bio}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  {' '}
                  Modifier
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text "
                  defaultValue={userData.localisation}
                  onChange={(e) => setLocalisation(e.target.value)}
                ></textarea>
                <textarea
                  type="text "
                  defaultValue={userData.numero}
                  onChange={(e) => setNumero(e.target.value)}
                ></textarea>
                <textarea
                  type="text "
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}> valider modification</button>
              </>
            )}
          </div>
          <h4>membre depuis le : {dateParser(userData.createdAt)}</h4>
          <h5
            onClick={() => {
              setFollowingPopup(true)
            }}
          >
            Abonnement : {userData.following ? userData.following.length : ''}{' '}
          </h5>
          {userData.typeCompte !== 'utilisateur' ? (
            <h5
              onClick={() => {
                setFollowersPopup(true)
              }}
            >
              Abonnés : {userData.followers ? userData.followers.length : ''}{' '}
            </h5>
          ) : (
            <></>
          )}
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnement</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              {' '}
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt=" user-pic" />
                        <h4>{user.psuedo}</h4>{' '}
                        <FollowHandler
                          idToFollow={user._id}
                          type="suggestion"
                        />
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}

      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              {' '}
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt=" user-pic" />
                        <h4>{user.psuedo}</h4>{' '}
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type="suggestion"
                          />
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil
