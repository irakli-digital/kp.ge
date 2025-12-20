import { NextRequest, NextResponse } from 'next/server';
import { createSubmission } from '@/lib/calculator-queries';
import { sendCalculatorSubmissionNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
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
    } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'სახელი და ელ-ფოსტა სავალდებულოა' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'გთხოვთ მიუთითოთ სწორი ელ-ფოსტა' },
        { status: 400 }
      );
    }

    if (!calculatorMode || !['subscription', 'one_time'].includes(calculatorMode)) {
      return NextResponse.json(
        { error: 'გთხოვთ აირჩიოთ კალკულატორის რეჟიმი' },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await createSubmission({
      name,
      company,
      email,
      phone,
      message,
      calculator_mode: calculatorMode,
      selected_package: selectedPackage,
      selected_package_name: selectedPackageName,
      duration_months: durationMonths,
      selected_services: selectedServices ? JSON.stringify(selectedServices) : undefined,
      episode_count: episodeCount,
      monthly_price: monthlyPrice,
      total_price: totalPrice,
      discount_amount: discountAmount,
    });

    // Send email notification
    const emailResult = await sendCalculatorSubmissionNotification({
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
    });

    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error);
      // Don't fail the request if email fails, submission is already saved
    }

    return NextResponse.json({
      success: true,
      message: 'თქვენი მოთხოვნა წარმატებით გაიგზავნა! მალე დაგიკავშირდებით.',
      submissionId: submission.id,
    });
  } catch (error) {
    console.error('Calculator submission error:', error);
    return NextResponse.json(
      { error: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით' },
      { status: 500 }
    );
  }
}
