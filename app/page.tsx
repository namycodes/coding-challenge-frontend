"use client";
import SideBar from "@/components/custom/ui/sideBar";
import { useQuery } from "@tanstack/react-query";
import {
	LucideCalendar,
	LucideCloudRain,
	LucideMapPin,
	LucideSearch,
	LucideThermometer,
	LucideWind,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import WeatherForecast from "@/components/custom/weatherForecast";
import { useWeatherHook } from "./provider";
import { Button } from "@/components/ui/button";

export default function Home() {
	const { setCity, city, countryCode, setCountryCode } = useWeatherHook();
	const getCurrentWeatherDetails = async () => {
		try {
			const response = await fetch(
				`/api/weather/current?city=${city}&countryCode=${countryCode}`
			);
			if (response.ok) {
				const { data } = await response.json();
				console.log(data);
				return data;
			}
			if (!response.ok) {
				const { data } = await response.json();
				console.log(data?.data?.error);
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	};
	const { data, isFetching, isError, refetch, isRefetching } = useQuery({
		queryKey: ["weather-details"],
		queryFn: getCurrentWeatherDetails,
	});
	return (
		<div className="flex gap-5 min-h-screen w-full pb-20 lg:p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div className="flex gap-10">
				<SideBar />

				<div className="w-full px-4 flex flex-col gap-3 h-auto py-5 bg-white/10 shadow-sm rounded-xl">
					<div className="flex flex-col gap-5">
						<div className=" flex w-full items-center justify-end gap-4">
							<Input
								required
								value={city}
								onChange={(e) => setCity(e.target.value)}
								placeholder="(city) e.g Lusaka"
								className="w-[200px] text-white placeholder-white border-none bg-white/15"
							/>

							<Input
								required
								value={countryCode}
								onChange={(e) => setCountryCode(e.target.value)}
								placeholder="(country code)e.g 260"
								className="w-[200px] border-none bg-white/15  text-white placeholder-white"
							/>

							<Button
								onClick={refetch}
								className="bg-white/15 flex hover:bg-white/20 items-center"
							>
								<LucideSearch size={18} className="hover:cursor-pointer" />{" "}
								Search
							</Button>
						</div>
						<div className="w-full px-4 flex flex-col gap-1 h-auto py-5 bg-white/10 shadow-sm rounded-xl">
							<Image
								// src={"/drizzle.gif"}
								src={`https://openweathermap.org/img/w/${
									data && data?.data[0]?.weather?.icon
								}.png`}
								width={50}
								className="rounded-xl"
								height={50}
								alt="rain"
							/>
							<h1 className="text-[28px]">
								{data && data?.data[0]?.app_temp}
								<sup>oC</sup>
							</h1>
							<div className="flex gap-1 items-center">
								<LucideCloudRain size={12} />
								<h1 className="text-[10px]">
									{data && data?.data[0]?.weather?.description}
								</h1>
							</div>
							<hr />
							<div className="flex gap-1 items-center">
								<LucideMapPin size={12} />
								<h1 className="text-[10px]">
									{data &&
										data?.data[0]?.city_name +
											"," +
											data?.data[0]?.country_code}
								</h1>
							</div>
							<div className="flex gap-1 items-center">
								<LucideCalendar size={12} />
								<h1 className="text-[10px]">
									{data && data?.data[0]?.datetime}
								</h1>
							</div>
						</div>
					</div>
					<h1>Today{"'"}s Highlights</h1>
					<div className="grid grid-cols-3 gap-4">
						<div className="w-full px-4 flex flex-col gap-1 h-auto py-5 bg-white/15 shadow-sm rounded-xl">
							<div className="flex items-center gap-4">
								<h1 className="text-[13px]">Wind Status</h1>
								<LucideWind />
							</div>
							<div className="flex items-center gap-6">
								<Image
									src="/wind.gif"
									alt="wind"
									width={50}
									className="rounded-2xl"
									height={50}
								/>
								<div>
									<h1>{data && data?.data[0]?.wind_spd} m/s</h1>
									<h1 className="capitalize text-sm">
										{data &&
											data?.data[0]?.wind_cdir_full +
												" " +
												`(${data?.data[0]?.wind_cdir})`}
									</h1>
								</div>
							</div>
						</div>
						<div className="w-full px-4 flex flex-col gap-1 h-auto py-5 bg-white/15 shadow-sm rounded-xl">
							<div className="flex items-center">
								<h1 className="text-[13px]">Temperature</h1>
								<LucideThermometer />
							</div>
							<h1 className="text-lg">
								{data && data?.data[0]?.app_temp}
								<sup>oC</sup>
							</h1>
						</div>
						<div className="w-full px-4 flex flex-col gap-1 h-auto py-5 bg-white/15 shadow-sm rounded-xl">
							<h1 className="text-[13px]">Humidity</h1>
							<div className="flex items-center gap-5">
								<Image
									src="/humidity.gif"
									alt="humidity"
									width={50}
									className="rounded-2xl"
									height={50}
								/>
								<h1 className="text-lg">
									{data && data?.data[0]?.rh}
									<sub>%</sub>
								</h1>
							</div>
						</div>
						<div className="w-full px-4 flex flex-col gap-1 h-auto py-5 bg-white/15 shadow-sm rounded-xl">
							<h1 className="text-[13px]">Air Quality</h1>
							<div className="flex items-center gap-5">
								<Image
									src="/airquality.gif"
									alt="air quality"
									width={50}
									className="rounded-2xl"
									height={50}
								/>
								<h1 className="text-lg">{data && data?.data[0]?.aqi}</h1>
							</div>
						</div>
						<div className="w-full px-4 flex flex-col gap-1 h-auto py-5 bg-white/15 shadow-sm rounded-xl">
							<h1 className="text-[13px]">City Name</h1>
							<h1>{data && data?.data[0]?.city_name}</h1>
						</div>
					</div>
				</div>
			</div>

			<div className="w-[400px] flex flex-col gap-4">
				<h1>16 days Forecast</h1>
				<WeatherForecast />
			</div>
		</div>
	);
}
