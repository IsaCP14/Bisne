const path = require('path');
const {body} = require('express-validator');

module.exports = [
    body('fullName').notEmpty().withMessage('Tienes que escribir tu nombre completo'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('city').notEmpty().withMessage('Tienes que escribir una ciudad'),
	body('productName').notEmpty().withMessage('Tienes que escribir el nombre del producto'),
	body('descripcion').notEmpty().withMessage('Tienes que escribir una descripción del producto'),
    body('precio').notEmpty().withMessage('Tienes que escribir el precio del producto'),
	body('category').notEmpty().withMessage('Tienes que elegir una categoria'),
	
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]