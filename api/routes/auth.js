const { Router } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dayjs = require('dayjs')
const crypto = require('crypto')
const nodeMailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const EmailTemplate = require('email-templates')

const router = Router()

// Mailgun Auth
const auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

// Mailgun transport
const nodemailerMailgun = nodeMailer.createTransport(mg(auth))

// Generate Token
const generateToken = function (user) {
  const payload = {
    iss: 'feedbox.io',
    sub: user.id,
    iat: dayjs().unix(),
    exp: dayjs().add(360, 'days').unix()
  }
  return jwt.sign(payload, process.env.JWT_SECRET)
}

// Login
router.post('/login', function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('email', 'Email cannot be blank').notEmpty()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  new User({ email: req.body.email })
    .fetch()
    .then(function (user) {
      if (!user) {
        return res.status(401).send({
          msg: `The email address ${req.body.email} is not associated with any account. Please double check your email address and try again`
        })
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {}
        if (!isMatch) {
          return res.status(401).send('Invalid email or password')
        }
        return res.status(200).json({
          token: generateToken(user)
        })
      })
    })
})

// Register User
router.post('/register', function (req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('email', 'Email cannot be blank').notEmpty()
  req.assert('password', 'Password must be at least 6 characters long').len(6)
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save()
    .then(function (user) {
      return res.status(200).json({
        token: generateToken(user)
      })
    })
    .catch(function (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send(
          { msg: 'The email address you have entered is already associated with another account.' }
        )
      }
    })
})

// Forgot Password
router.post('/forgot', function (req, res, next) {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('email', 'Email cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  new User({ email: req.body.email })
    .fetch()
    .then(function (user) {
      if (!user) {
        return res.status(404).send({
          msg: 'Email not found in database'
        })
      }
      const token = crypto.randomBytes(10).toString('hex')
      user.set('passwordResetToken', token)
      user.set('passwordResetExpires', dayjs().add(2, 'hours').unix())
      user.save()
      const sendResetLink = new EmailTemplate({
        message: {
          from: 'no-reply@feedbox.io'
        },
        views: {
          options: {
            extension: 'ejs' // <---- HERE
          }
        }
      })

      sendResetLink.render('templates/passwordreset', {
        name: user.attributes.name,
        token: `http://${req.headers.host}/reset/${token}`
      }).then(function (result) {
        nodemailerMailgun.sendMail({
          from: 'Feedbox <no-reply@feedbox.io>',
          to: req.body.email,
          subject: 'Password reset',
          html: result
        })

        return res.status(200).send({
          msg: 'Successfully sent email with reset link'
        })
      }).catch(function (err) {
        if (err) {
          return res.status(400).send({
            msg: 'Oops there was some problem'
          })
        }
      })
    })
})

// Reset Token check
router.get('/reset/:token', function (req, res) {
  User.query(function (qb) {
    qb.where('passwordResetToken', req.params.token)
      .andWhere('passwordResetExpires', '>', dayjs().unix())
  }).fetch()
    .then(function (user) {
      if (!user) {
        return res.status(400).send({
          msg: 'Reset password token expired'
        })
      }
      return res.status(200).send({
        msg: 'Password token is valid'
      })
    })
})

// Reset user's password
router.post('/reset/:token', function (req, res) {
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.assert('password', 'Password must be at least 6 characters long').len(6)

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  User.query(function (qb) {
    qb.where('passwordResetToken', req.params.token)
      .andWhere('passwordResetExpires', '>', dayjs().unix())
  }).fetch()
    .then(function (user) {
      if (!user) {
        return res.status(400).send({
          msg: 'Reset password token expired'
        })
      }

      user.set('password', req.body.password)
      user.set('passwordResetToken', null)
      user.set('passwordResetExpires', null)
      user.save()

      return res.status(200).send({
        msg: 'Password updated successfully'
      })
    })
})

router.post('/logout', function (req, res, next) {
  res.json({ status: 'OK' })
})

module.exports = router
