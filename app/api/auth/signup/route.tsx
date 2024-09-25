import { NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
	const { email, password, firstName, lastName, confirmPassword, username } =
		await request.json();
	try {
		const response = await fetch(`${API_URL}/auth/signup`, {
			body: JSON.stringify({
				email,
				password,
				firstName,
				lastName,
				confirmPassword,
				username,
			}),
			headers: {
				"content-type": "application/json",
			},
			method: "POST",
		});
		if (response.ok) {
			const { message, statusCode } = await response.json();
			return NextResponse.json(
				{
					message,
				},
				{
					status: statusCode,
				}
			);
		}
		if (!response.ok) {
			const { message, statusCode } = await response.json();
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
				error,
			},
			{ status: 500 }
		);
	}
}
