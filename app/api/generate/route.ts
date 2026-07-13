import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// FIX: Explicitly pass the apiKey configuration block to the constructor
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(request: Request) {
  try {
    // Double check that our environment variable is actually loading
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Backend Key Configuration Missing. Check your .env.local file.' }, 
        { status: 500 }
      );
    }

    const { systemPrompt, temperature, userPrompt } = await request.json();

    if (!userPrompt) {
      return NextResponse.json({ error: 'User prompt is required' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt || undefined,
        temperature: temperature,
      },
    });

    return NextResponse.json({ text: response.text });

  } catch (error: any) {
    console.error('Gemini Backend Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}