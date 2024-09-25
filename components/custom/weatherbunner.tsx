import Image from "next/image";
import WeatherImage from "@/public/weather.svg";
export default function WeatherBunner() {
	return (
		<div className="">
			<Image
				src={WeatherImage}
				alt="weather-bunner"
				width={400}
				height={400}
				priority
			/>
		</div>
	);
}
