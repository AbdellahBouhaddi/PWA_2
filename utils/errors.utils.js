module.exports.signUpErrors = (err) => {
  let errors = { psuedo: '', email: '', password: '' }

  if (err.message.includes('psuedo'))
    errors.psuedo = 'Pseudo incorrect ou déjà pris'

  if (err.message.includes('email')) errors.email = 'Email incorrect'

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire 6 caractères minimum'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Cet email est déjà enregistré'

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('psuedo'))
    errors.psuedo = 'Ce psuedo est déjà enregistré'

  return errors
}

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'email incorrect '

  if (err.message.includes('password')) errors.password = 'password incorrect '

  return errors
}
