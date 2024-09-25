import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME: any = process.env.NEXT_PUBLIC_COOKIE_NAME;

export async function GET(request: Request) {
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
			{ message: "Internal Server Error" },
			{
				status: 500,
			}
		);
	}
}
