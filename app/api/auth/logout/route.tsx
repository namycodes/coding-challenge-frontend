import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export async function GET() {
	try {
		const cookieStorage = cookies();
		await cookieStorage.delete(COOKIE_NAME);
		return NextResponse.json(
			{
				message: "Successfully Logged out",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal Server Error", error },
			{
				status: 500,
			}
		);
	}
}
