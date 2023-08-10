const express = require('express');
const router = express.Router();


//Controller
const mainController = require('../controllers/mainController');

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Formulario de Registro
router.get('/register', guestMiddleware, mainController.register);

// Procesa Formulario Register
router.post('/register', uploadFile.single('avatar'), validations, mainController.processRegister);

//Formulario de Login
router.get('/login', guestMiddleware, mainController.login);

// Procesa Formulario Login
router.post('/login', mainController.loginProcess);

//Formulario de NewProducts
router.get('/newProducts', mainController.newProducts);

// Procesar Formulario New Products 
router.post('/newProducts', uploadFile.single('avatar'), validations, mainController.processNewProducts);

// Perfil de usuario
router.get('/profile/', authMiddleware, mainController.profile);

//Otros Get

router.get('/', mainController.index);
router.get('/index', mainController.index);
router.get('/productCart', mainController.productCart);
router.get('/productDetail', mainController.productDetail);
router.get('/categories', mainController.categories);

//Logout
router.get('/logout/', mainController.logout);



module.exports = router;