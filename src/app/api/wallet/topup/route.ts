import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthUser();
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { amount } = await request.json();

    if (!amount || typeof amount !== 'number' || amount < 10) {
      return NextResponse.json({ error: 'Minimum top-up amount is £10' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(auth.userId) },
      { $inc: { balance: amount } },
      { returnDocument: 'after' }
    );

    if (!result) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ balance: result.balance });
  } catch (err) {
    console.error('Top-up error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
