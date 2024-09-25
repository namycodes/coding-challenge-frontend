import { NextResponse } from "next/server";
import { serialize } from "cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_AGE: number | any = process.env.NEXT_PUBLIC_MAX_AGE;
const COOKIE_NAME: string | undefined = process.env.NEXT_PUBLIC_COOKIE_NAME;
export async function POST(request: Request) {
	const { email, password } = await request.json();
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			body: JSON.stringify({
				email,
				password,
				returnUrl: "/",
				rememberLogin: true,
			}),
			headers: {
				"content-type": "application/json",
			},
			method: "POST",
		});
		if (response.ok) {
			const { token, message, statusCode } = await response.json();
			const serialized = serialize(COOKIE_NAME!, token, {
				maxAge: MAX_AGE,
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				path: "/",
			});
			return new Response(JSON.stringify(message), {
				status: statusCode,
				headers: {
					"Set-Cookie": serialized,
				},
			});
		}
		if (!response.ok) {
			const { statusCode, message, error } = await response.json();
			return NextResponse.json(
				{
					message,
				},
				{
					status: statusCode,
				}
			);
		}
	} catch (error) {
		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
