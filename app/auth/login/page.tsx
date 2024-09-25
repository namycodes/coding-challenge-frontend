import WeatherBunner from "@/components/custom/weatherbunner";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/forms/login";
import Link from "next/link";

export default function Login() {
	return (
		<div className="flex w-full  p-5 justify-around items-center h-screen">
			<div className=" bg-white/5 hidden rounded-lg lg:flex justify-center items-center flex-1 h-full w-full">
				<div className="flex flex-col gap-10">
					<div className="bg-blue-500 translate-x-8 translate-y-72 w-[100px] blur-2xl h-[100px] rounded-[100px]" />
					<h1 className="text-2xl">Welcome to the live weather forecast</h1>
					<WeatherBunner />
				</div>
			</div>
			<div className="flex justify-center w-full h-full flex-1 items-center">
				<Card className="lg:w-[450px] outline-none border-none  backdrop-blur-sm bg-transparent text-white">
					<CardHeader>
						<CardTitle className="text-center">Login To Continue</CardTitle>
					</CardHeader>
					<CardContent>
						<LoginForm />
					</CardContent>
					<CardFooter>
						<div className="flex items-center gap-1">
							<h1>Don{"'"}t have an account yet?</h1>
							<Link className="underline" href={"/auth/signup"}>
								Signup
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
