const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const fs = require('fs');
const User = require('../models/User');
const path = require('path');

const controller = {
	register: (req, res) => {
        //return res.render(path.resolve(__dirname, '../views/registerForm'));
		return res.render('registerForm');
    },
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			//return res.render(path.resolve(__dirname, '../views/registerForm'), {
				return res.render('registerForm',{
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('registerForm', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);
		return res.redirect('/user/login');
	},
	
	login: (req, res) => {
		return res.render('loginForm');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('loginForm', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('loginForm', {
			errors: {
				email: {
					msg: 'No se encuentra este correo en nuestra base de datos'
				}
			}
		});
	},

    newProducts: (req, res) => {
		return res.render('newProducts');
	},

	processNewProducts: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('newProducts', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
		return res.send('Ok, las validaciones se pasaron y no tienes errores');
	},

		profile: (req, res) => {
		return res.render('profile', {
			user: req.session.userLogged
		});
    },
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
    },

	index: (req, res) => {
        res.render('index')
    },
          
    productCart: (req, res) => {
        res.render('productCart')
    },
    productDetail: (req, res) => {
        res.render('productDetail')
    },
    categories: (req, res) => {
        res.render('categories')
    }
}

module.exports = controller;