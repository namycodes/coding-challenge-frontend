import { LucideLoader } from "lucide-react";

export default function Loading() {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<LucideLoader className="animate-spin" />
		</div>
	);
}
