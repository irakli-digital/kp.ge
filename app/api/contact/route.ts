import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'გთხოვთ შეავსოთ ყველა ველი' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'გთხოვთ მიუთითოთ სწორი ელ-ფოსტა' },
        { status: 400 }
      )
    }

    // Send notification email
    const result = await sendContactFormNotification({ name, email, message })

    if (!result.success) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json(
      { message: 'შეტყობინება წარმატებით გაიგზავნა!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით' },
      { status: 500 }
    )
  }
}
