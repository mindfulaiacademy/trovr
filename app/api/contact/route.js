import { getCoach } from '@/lib/coaches';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const id = searchParams.get('id');

  if (!city || !id) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const coach = getCoach(city, id);
  if (!coach) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    email: coach.contactEmail,
    phone: coach.contactPhone,
  });
}
