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
import { LoginSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
	const [isFormSubmiting, setIsformSubmiting] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { replace } = useRouter();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setIsformSubmiting(true);
		setErrorMessage("");
		try {
			const response = await fetch(`/api/auth/login`, {
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
				replace("/");
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
				className="flex flex-col gap-10 h-full"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<h1 className="text-red-500 text-[14px] text-center">
					{errorMessage ? errorMessage : ""}
				</h1>
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
				<Button disabled={isFormSubmiting} className="" type="submit">
					{isFormSubmiting ? (
						<LucideLoader2 className="animate-spin" />
					) : (
						"Login"
					)}
				</Button>
			</form>
		</Form>
	);
}
