import nodemailer from 'nodemailer'

import {
  EMAIL_HOST_KEY,
  EMAIL_PASSWORD_KEY,
  EMAIL_USER_KEY,
} from '../../utils/environment-variables'

function getEmailConfiguration() {
  return {
    EMAIL_HOST: import.meta.env[EMAIL_HOST_KEY],
    EMAIL_USER: import.meta.env[EMAIL_USER_KEY],
    EMAIL_PASSWORD: import.meta.env[EMAIL_PASSWORD_KEY],
  }
}

const { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USER } = getEmailConfiguration()

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
})

export async function parseEmail(formData: Record<string, unknown>) {
  console.log(formData)
  await transporter.sendMail({
    from: `"Nirina Rabeson" <${EMAIL_USER}>`, // sender address
    to: EMAIL_USER, // list of receivers
    subject: "Vous avez une demande d'inscription à la newsletter", // Subject line
    text: `${formData.email} veut s'inscrire à la newsletter.`,
  })
}
