import { NextRequest, NextResponse } from 'next/server'
import { sendNewsletterNotification } from '@/lib/email'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'გთხოვთ მიუთითოთ სწორი ელ-ფოსტა' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await sql`
      SELECT id FROM newsletter_subscribers WHERE email = ${email}
    `

    if (existing.length > 0) {
      return NextResponse.json(
        { message: 'თქვენ უკვე გამოწერილი გაქვთ სიახლეები!' },
        { status: 200 }
      )
    }

    // Save to database
    await sql`
      INSERT INTO newsletter_subscribers (email, subscribed_at)
      VALUES (${email}, NOW())
    `

    // Send notification email
    await sendNewsletterNotification(email)

    return NextResponse.json(
      { message: 'გმადლობთ გამოწერისთვის!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით' },
      { status: 500 }
    )
  }
}
