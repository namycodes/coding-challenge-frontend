import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COOKIE_NAME=
	process.env.NEXT_PUBLIC_COOKIE_NAME;
export async function GET(request) {
	// Get Url Query Params
	const url = new URL(request.url);
	const city = url.searchParams.get("city");
	const countryCode = url.searchParams.get("countryCode");

	// Get a hold of the cookie storage from the browser and access the cookie
	const cookieStorage = cookies();
	const token = cookieStorage.get(COOKIE_NAME);
	try {
		// check if the cookie is availble from the browser if not then user is not authenticated
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

		const response = await fetch(
			`${API_URL}/weather/current?city=${city}&countryCode=${countryCode}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token?.value}`,
				},
			}
		);
		if (response.ok) {
			const { data, statusCode } = await response.json();
			console.log(data);
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
			console.log(data);
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
		console.log(error);
		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{
				status: 500,
			}
		);
	}
}
