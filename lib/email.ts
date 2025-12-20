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

export async function sendCalculatorSubmissionNotification({
  name,
  company,
  email,
  phone,
  message,
  calculatorMode,
  selectedPackage,
  selectedPackageName,
  durationMonths,
  selectedServices,
  episodeCount,
  monthlyPrice,
  totalPrice,
  discountAmount,
}: {
  name: string
  company?: string
  email: string
  phone?: string
  message?: string
  calculatorMode: 'subscription' | 'one_time'
  selectedPackage?: string
  selectedPackageName?: string
  durationMonths?: number
  selectedServices?: string[]
  episodeCount?: number
  monthlyPrice?: number
  totalPrice?: number
  discountAmount?: number
}) {
  const isSubscription = calculatorMode === 'subscription'
  const modeLabel = isSubscription ? 'სააბონემენტო პაკეტი' : 'ერთჯერადი სერვისები'

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return '-'
    return `${price.toLocaleString('ka-GE')} ₾`
  }

  const subject = `ახალი სპონსორობის მოთხოვნა - ${name} (${modeLabel})`

  let detailsHtml = ''

  if (isSubscription) {
    detailsHtml = `
      <p><strong>პაკეტი:</strong> ${selectedPackageName || selectedPackage || '-'}</p>
      <p><strong>ხანგრძლივობა:</strong> ${durationMonths ? `${durationMonths} თვე` : '-'}</p>
      <p><strong>თვიური ფასი:</strong> ${formatPrice(monthlyPrice)}</p>
    `
  } else {
    detailsHtml = `
      <p><strong>არჩეული სერვისები:</strong></p>
      <ul style="margin: 10px 0; padding-left: 20px;">
        ${(selectedServices || []).map(s => `<li>${s}</li>`).join('')}
      </ul>
      <p><strong>ეპიზოდების რაოდენობა:</strong> ${episodeCount || '-'}</p>
    `
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">ახალი სპონსორობის მოთხოვნა</h2>

      <div style="background: #f59e0b; color: #000; padding: 10px 15px; border-radius: 4px; margin-bottom: 20px; display: inline-block;">
        <strong>${modeLabel}</strong>
      </div>

      <div style="background: #1a1a1a; color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #f59e0b; margin-top: 0;">საკონტაქტო ინფორმაცია</h3>
        <p><strong>სახელი:</strong> ${name}</p>
        ${company ? `<p><strong>კომპანია:</strong> ${company}</p>` : ''}
        <p><strong>ელ-ფოსტა:</strong> <a href="mailto:${email}" style="color: #f59e0b;">${email}</a></p>
        ${phone ? `<p><strong>ტელეფონი:</strong> <a href="tel:${phone}" style="color: #f59e0b;">${phone}</a></p>` : ''}

        <h3 style="color: #f59e0b; margin-top: 25px;">არჩეული პარამეტრები</h3>
        ${detailsHtml}

        <h3 style="color: #f59e0b; margin-top: 25px;">ფასები</h3>
        <p><strong>ჯამური ფასი:</strong> <span style="font-size: 20px; color: #22c55e;">${formatPrice(totalPrice)}</span></p>
        ${discountAmount && discountAmount > 0 ? `<p><strong>ფასდაკლება:</strong> <span style="color: #22c55e;">-${formatPrice(discountAmount)}</span></p>` : ''}

        ${message ? `
          <h3 style="color: #f59e0b; margin-top: 25px;">დამატებითი შეტყობინება</h3>
          <p style="white-space: pre-wrap; background: #0a0a0a; padding: 15px; border-radius: 4px;">${message}</p>
        ` : ''}
      </div>

      <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
      <p style="color: #666; font-size: 12px;">ეს შეტყობინება გამოგზავნილია kp.ge სპონსორობის კალკულატორიდან</p>
    </div>
  `

  return sendEmail({
    to: process.env.NOTIFICATION_EMAIL || 'gvantsa@kp.ge',
    subject,
    html,
  })
}
