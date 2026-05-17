import { Pool } from 'pg';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, 
});

//get count
export async function GET() {
  try {
    const query = `
      SELECT count FROM user_count 
      WHERE wrapped_count = 'github' 
      LIMIT 1;
    `;
    const { rows } = await pool.query(query);
    
    const totalCount = rows[0]?.count ?? 0;
    return NextResponse.json({ count: totalCount }, { status: 200 });
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json({ count: 0, error: "Failed to read database metric" }, { status: 500 });
  }
}

//increase count 
export async function POST() {
  try {
    const query = `
      UPDATE user_count 
      SET count = count + 1 
      WHERE wrapped_count = 'github' 
      RETURNING count;
    `;
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Target key row 'github' not found" }, { status: 404 });
    }

    return NextResponse.json({ count: rows[0].count }, { status: 200 });
  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json({ error: "Failed to process database mutation" }, { status: 500 });
  }
}