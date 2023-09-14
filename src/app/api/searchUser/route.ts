import { NextRequest, NextResponse } from "next/server";
export async function POST(request: Request, response: Response) {
  try {
    const formData = new FormData();
    const json = await request.json();
    formData.append("nick", json.nick); // Get the 'nick' value from the request body

    // Perform your server-side API call here
    const response = await fetch(`${process.env.API_DOMAIN}/getuser`, {
      method: "POST",
      body: formData,
      next: { revalidate: 1 } 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
