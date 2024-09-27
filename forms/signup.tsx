"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUpForm() {
	const [isFormSubmiting, setIsformSubmiting] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { replace } = useRouter();
	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			username: "",
			firstName: "",
			lastName: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
		setIsformSubmiting(true);
		setErrorMessage("");
		try {
			const response = await fetch(`/api/auth/signup`, {
				body: JSON.stringify({
					...values,
				}),
				method: "POST",
			});
			if (response.ok) {
				const { message } = await response.json();
				console.log(message);
				setIsformSubmiting(false);
				setErrorMessage("");
				replace("/auth/login");
			}
			if (!response.ok) {
				const { message } = await response.json();
				setErrorMessage(message);
				console.log(message);
				setIsformSubmiting(false);
			}
		} catch (error) {
			console.log(error);
			setIsformSubmiting(false);
		}
	};
	return (
		<Form {...form}>
			<form
				className="flex gap-2 flex-col h-full"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<h1 className="text-red-500 text-[14px] text-center">
					{errorMessage ? errorMessage : ""}
				</h1>
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="firstname">FirstName</FormLabel>
								<FormControl>
									<Input placeholder="john" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="lastname">LastName</FormLabel>
								<FormControl>
									<Input placeholder="doe" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex  gap-2">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="username">Username</FormLabel>
								<FormControl>
									<Input placeholder="johndoe0" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="email">Email</FormLabel>
								<FormControl>
									<Input placeholder="johndoe@mail.com" {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="password">Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="***********" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="***********" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button disabled={isFormSubmiting} className="" type="submit">
					{isFormSubmiting ? (
						<LucideLoader2 className="animate-spin" />
					) : (
						"Signup"
					)}
				</Button>
			</form>
		</Form>
	);
}
