# PWA_2

npm install --save body-parser@1.20.0

npm install --save dotenv@16.0.1

npm install --save express@4.18.1

npm install --save mongoose@6.3.5

npm install --save nodemon@2.0.16

npm install --save validator@13.7.0

npm i -s bcrypt
npm i -s jsonwebtoken
npm i -s cookie-parser

npm i -s multer@2.0.0-rc.1

npm i -s cors//mongodb+srv://abdellah:blackroci24@likididb.lu9fpuu.mongodb.net/test

email : admin@gmail.com
mdp : adminadmin

email : commercon@gmail.com
mdp : commerconcommercon

email : user@gmail.com
mdp : useruser

const ALLOWED_ORIGINS = ['http://localhost:3000', '*']

app.get('/private', function (req, res) {
if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
res.set('Access-Control-Allow-Credentials', 'true')
res.set('Access-Control-Allow-Origin', req.headers.origin)
} else {
// allow other origins to make unauthenticated CORS requests
res.set('Access-Control-Allow-Origin', '\*')
}

if (req.session.loggedIn === true) {
res.send('THIS IS THE SECRET')
} else {
res.send('Please login first')
}
})
