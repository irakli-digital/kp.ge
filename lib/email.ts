import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface SendEmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"ცოდნისმოყვარე პოდკასტი" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

export async function sendNewsletterNotification(subscriberEmail: string) {
  const subject = 'ახალი გამომწერი - ცოდნისმოყვარე პოდკასტი'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">ახალი გამომწერი!</h2>
      <p>ახალი მომხმარებელი გამოიწერა სიახლეები:</p>
      <p style="background: #1a1a1a; color: #fff; padding: 15px; border-radius: 8px; font-size: 18px;">
        <strong>${subscriberEmail}</strong>
      </p>
      <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">ეს შეტყობინება გამოგზავნილია kp.ge ვებგვერდიდან</p>
    </div>
  `

  return sendEmail({
    to: process.env.NOTIFICATION_EMAIL || 'gvantsa@kp.ge',
    subject,
    html,
  })
}

export async function sendContactFormNotification({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  const subject = `ახალი შეტყობინება - ${name}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">ახალი შეტყობინება კონტაქტის ფორმიდან</h2>

      <div style="background: #1a1a1a; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>სახელი:</strong> ${name}</p>
        <p><strong>ელ-ფოსტა:</strong> <a href="mailto:${email}" style="color: #f59e0b;">${email}</a></p>
        <p><strong>შეტყობინება:</strong></p>
        <p style="white-space: pre-wrap; background: #0a0a0a; padding: 15px; border-radius: 4px;">${message}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">ეს შეტყობინება გამოგზავნილია kp.ge ვებგვერდიდან</p>
    </div>
  `

  return sendEmail({
    to: process.env.NOTIFICATION_EMAIL || 'gvantsa@kp.ge',
    subject,
    html,
  })
}
