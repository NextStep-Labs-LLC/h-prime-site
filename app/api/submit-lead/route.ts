import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  recaptchaToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let recaptchaScore = 1.0; // Default score when reCAPTCHA is disabled

    // Verify reCAPTCHA token only if configured and token is not 'bypass'
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && data.recaptchaToken && data.recaptchaToken !== 'bypass') {
      try {
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${data.recaptchaToken}`,
          { method: 'POST' }
        );

        const recaptchaData = await recaptchaResponse.json();

        // Check reCAPTCHA score (minimum 0.3)
        if (!recaptchaData.success || recaptchaData.score < 0.3) {
          console.log('Low reCAPTCHA score:', recaptchaData.score);
          // Save as potential bot, but don't send to Google Ads
          return NextResponse.json(
            { error: 'Failed verification' },
            { status: 400 }
          );
        }

        recaptchaScore = recaptchaData.score;
      } catch (error) {
        console.log('reCAPTCHA verification failed, proceeding without it');
      }
    }

    // Prepare lead data for n8n webhook
    const leadPayload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message || '',
      source: 'website',
      timestamp: new Date().toISOString(),
      recaptchaScore: recaptchaScore,
      url: request.headers.get('referer') || 'unknown',
    };

    // Send to n8n webhook for processing
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}




