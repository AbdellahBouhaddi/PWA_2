const router = require('express').Router()

const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const uploadController = require('../controllers/upload.controller')
const path = require('path')
const multer = require('multer')
const upload = multer()
/*const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, './Images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  },
})*/
//const upload = multer({ storage: storage })

//auth
router.post('/register', authController.singUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)

// user display : 'block'

router.get('/', userController.getAllUsers)
router.get('/:id', userController.userInfo)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

// upload

router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router
