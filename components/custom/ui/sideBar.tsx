import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	LucideBellDot,
	LucideCloud,
	LucideLayoutGrid,
	LucideLogOut,
	LucideSettings,
} from "lucide-react";

export default function SideBar() {
	return (
		<div className="h-full flex flex-col justify-between w-[400px] p-3 bg-white/15 rounded-2xl">
			<div className="bg-white/40 translate-y-10 h-[300px] blur-xl translate-x-2 w-[10px]  absolute" />
			<div className="flex flex-col gap-3">
				<div className="gap-2 flex ">
					<LucideCloud size={30} className="text-blue-500" />
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
				<Avatar>
					<AvatarImage src="https://github.com/namycodes.png" />
					<AvatarFallback>NC</AvatarFallback>
				</Avatar>
				<Button variant={"ghost"} className="">
					<LucideLogOut /> Logout
				</Button>
			</div>
		</div>
	);
}
