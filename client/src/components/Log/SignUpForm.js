import React, { useState } from 'react'
import axios from 'axios'

import SignInForm from './SignInForm'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)

  const [psuedo, setPsuedo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [typeCompte, setTypeCompte] = useState('')
  const [numero, setNumero] = useState()
  const [localisation, setLocalisation] = useState()
  const [controlPassword, setControlPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const terms = document.getElementById('terms')
    const psuedoError = document.querySelector('.psuedo.error')
    const emailError = document.querySelector('.email.error')
    const numeroError = document.querySelector('.numero.error')
    const passwordError = document.querySelector('.password.error')
    const typrcomptError = document.querySelector('.type.error')
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    )
    const termsError = document.querySelector('.terms.error')
    passwordConfirmError.innerHTML = ''
    termsError.innerHTML = ''
    typrcomptError.innerHTML = ''
    if (password !== controlPassword || !terms.checked || typeCompte === '') {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          'les mots de passe ne correspondent pas.'

      if (!terms.checked)
        termsError.innerHTML = 'veullez valider les conditions générales. '
      if (typeCompte === '')
        typrcomptError.innerHTML = 'veullez choisir le type de compte '
    } else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          psuedo,
          email,
          password,
          typeCompte,
          numero,
          localisation,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.errors) {
            psuedoError.innerHTML = res.data.errors.psuedo
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
            numeroError.innerHTML = res.data.errors.numero
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            {' '}
            enregistrement reussi, veuillez vous connecer{' '}
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="psuedo">Psuedo</label>
          <br />
          <input
            type="text"
            name="psuedo"
            id="psuedo"
            onChange={(e) => setPsuedo(e.target.value)}
            value={psuedo}
          />
          <div className="psuedo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="email">Type de compte</label>
          <br />
          <select
            type="text"
            name="typeCompte"
            id="typeCompte"
            onChange={(e) => setTypeCompte(e.target.value)}
            value={typeCompte}
          >
            <option value="" hidden="true"></option>
            <option value="commercon">commerçon</option>
            <option value="utilisateur">utilisateur</option>
          </select>

          <div className="type error"></div>
          <br />
          {typeCompte === 'utilisateur' || typeCompte === '' ? (
            <></>
          ) : (
            <>
              <label htmlFor="email">Numero</label>
              <br />
              <input
                type="number"
                name="numero"
                id="numero"
                onChange={(e) => setNumero(e.target.value)}
                value={numero}
              />
              <div className="numero error"></div>
              <br />
              <label htmlFor="email">Localisation</label>
              <br />
              <input
                type="text"
                name="localisation"
                id="localisation"
                onChange={(e) => setLocalisation(e.target.value)}
                value={localisation}
              />
              <div className="localisation error"></div>
              <br />
            </>
          )}

          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />

          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            {' '}
            j'accepte les{' '}
            <a href="/" target="_blank" rel="noopener noreferre">
              {' '}
              condition générales
            </a>{' '}
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="valider inscription" />
        </form>
      )}
    </>
  )
}

export default SignUpForm
