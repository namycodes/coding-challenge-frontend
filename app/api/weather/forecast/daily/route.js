import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COOKIE_NAME =
	process.env.NEXT_PUBLIC_COOKIE_NAME;
export async function GET(request) {
	const url = new URL(request.url);
	const city = url.searchParams.get("city");
	const countryCode = url.searchParams.get("countryCode");
	const cookieStorage = cookies();
	const token = cookieStorage.get(COOKIE_NAME);
	if (!token || token?.value === undefined) {
		return NextResponse.json(
			{
				message: "Unauthorised",
			},
			{
				status: 401,
			}
		);
	}
	try {
		const response = await fetch(
			`${API_URL}/weather/forecast/daily?city=${city}&countryCode=${countryCode}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token?.value}`,
				},
			}
		);
		if (response.ok) {
			const { data, statusCode } = await response.json();
			return NextResponse.json(
				{
					data,
				},
				{
					status: statusCode,
				}
			);
		}
		if (!response.ok) {
			const { data, statusCode } = await response.json();
			return NextResponse.json(
				{
					data,
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
			{
				status: 500,
			}
		);
	}
}
