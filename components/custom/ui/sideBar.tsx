"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LucideLayoutGrid, LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SideBar() {
	const { replace } = useRouter();
	const logout = async () => {
		try {
			const response = await fetch("/api/auth/logout");
			if (response.ok) {
				replace("/auth/login");
			}
			if (!response.ok) {
				alert("An Error occured while logging out");
			}
		} catch (error) {
			alert("An Error occured while logging out");
		}
	};
	return (
		<div className="h-full lg:flex flex-col hidden justify-between w-[400px] p-3 bg-white/15 rounded-2xl">
			<div className="bg-white/40 translate-y-10 h-[300px] blur-xl translate-x-2 w-[10px]  absolute" />
			<div className="flex flex-col gap-3">
				<div className="gap-2 flex ">
					<Avatar>
						<AvatarImage src="https://github.com/namycodes.png" />
						<AvatarFallback>NC</AvatarFallback>
					</Avatar>
					<h1 className="text-[10px]">
						24/7 Live Weather Forecast by @namycodes
					</h1>
					<hr />
				</div>
				<div>
					<Button className="flex justify-start gap-5 w-full">
						<LucideLayoutGrid size={20} /> Dashboard
					</Button>
				</div>
			</div>
			<div className="flex items-center w-full gap-4">
				<Button onClick={logout} variant={"ghost"} className="w-full">
					<LucideLogOut /> Logout
				</Button>
			</div>
		</div>
	);
}
