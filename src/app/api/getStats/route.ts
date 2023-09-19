import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = new FormData();
    const json = await request.json();
    formData.append("nick", json.nick);
    formData.append("date", json.date);
    const response = await fetch(`${process.env.API_DOMAIN}/stats`, {
      method: "POST",
      body: formData,
      next: { revalidate: 1 },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
