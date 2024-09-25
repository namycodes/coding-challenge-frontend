import { z } from "zod";

export const LoginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email("Invalid Email format"),
	password: z.string({ required_error: "Password is required" }),
});

export const SignUpSchema = LoginSchema.extend({
	firstName: z
		.string({ required_error: "Name is required" })
		.min(3, "Name should be at least 3 characters long"),
	lastName: z
		.string({ required_error: "Last Name is required" })
		.min(3, "Last name should at least be 3 characters long"),
	username: z
		.string({ required_error: "Username is required" })
		.min(3, "username should be at least 3 characters long"),
	confirmPassword: z
		.string({ required_error: "confirm Password is required" })
		.min(8, "Password should be at least 8 characters long"),
});
