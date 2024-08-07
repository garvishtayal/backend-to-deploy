const express = require('express');
const router = express.Router();


const { validateToken } = require('./controllers/AuthControllers/validateToken');
const { login } = require('./controllers/AuthControllers/login');
const { signup } = require('./controllers/AuthControllers/singup');
const { verifyCaptcha } = require('./controllers/AuthControllers/verifyCaptcha');

const { otpGenerator } = require('./controllers/ResetPassword/otpGenerator');
const { resetPassword } = require('./controllers/ResetPassword/resetPassword');

const { getLeads } = require('./controllers/leadController');
const { addLead } = require('./controllers/leadController');
const { editLead } = require('./controllers/leadController');
const { deleteLead } = require('./controllers/leadController');


//Auth Routes
router.post('/validate-token', validateToken)
router.post('/login', login)
router.post('/signup', signup)
router.post('/verify-captcha', verifyCaptcha)

//Reset Password
router.post('/otp-generate', otpGenerator)
router.post('/reset-password', resetPassword)

//Leads
router.get('/get-leads', getLeads)
router.post('/add-lead', addLead)
router.put('/edit-lead/:id', editLead)
router.delete('/delete-lead/:id', deleteLead)

module.exports = router;