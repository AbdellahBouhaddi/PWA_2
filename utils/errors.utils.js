module.exports.signUpErrors = (err) => {
  let errors = { psuedo: '', email: '', password: '' }

  if (err.message.includes('psuedo'))
    errors.psuedo = 'Pseudo incorrect ou déjà pris'

  if (err.message.includes('email')) errors.email = 'Email incorrect'

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire 8 caractères minimum'

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

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' }

  if (err.message.includes('invalid file'))
    errors.format = ' format incompatible'

  if (err.message.includes('max size'))
    errors.format = ' le fichier dépasse 500 ko'

  return errors
}
