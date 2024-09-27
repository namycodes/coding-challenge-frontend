"use client";
import SideBar from "@/components/custom/ui/sideBar";
import { useQuery } from "@tanstack/react-query";
import {
	LucideCalendar,
	LucideCloudRain,
	LucideLayoutGrid,
	LucideLoader2,
	LucideLogOut,
	LucideMapPin,
	LucideSearch,
	LucideThermometer,
	LucideWind,
} from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import WeatherForecast from "@/components/custom/weatherForecast";
import { useWeatherHook } from "./provider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function Home() {
	const { replace } = useRouter();
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
			console.log(error)
			alert("An Error occured while logging out");
		}
	};
	const { data, isFetching, refetch, isRefetching } = useQuery({
		queryKey: ["weather-details"],
		queryFn: getCurrentWeatherDetails,
	});
	return (
		<div className="lg:flex p-5 flex flex-col lg:flex-row gap-5 min-h-screen overflow-hidden w-full pb-20 lg:p-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div className="lg:hidden">
				<Drawer direction="left">
					<DrawerTrigger>
						<LucideLayoutGrid />
					</DrawerTrigger>
					<DrawerContent className="h-screen">
						<DrawerHeader>
							<DrawerTitle className="flex items-center">
								<Avatar>
									<AvatarImage src="https://github.com/namycodes.png" />
									<AvatarFallback>NC</AvatarFallback>
								</Avatar>
								<div className="flex flex-col gap-2">
									<h1 className="text-[10px]">
										24/7 Live Weather Forecast by @namycodes
									</h1>
									<h1 className="text-[10px]">
										Built with love by @namycodes.
									</h1>
								</div>
							</DrawerTitle>
						</DrawerHeader>
						<div>
							<Button className="flex justify-start gap-5 w-full">
								<LucideLayoutGrid size={20} /> Dashboard
							</Button>
						</div>

						<DrawerFooter className="flex flex-col gap-1 items-center">
							<div className="flex items-center w-full gap-4">
								<Button onClick={logout} className="bg-white text-black w-full">
									<LucideLogOut /> Logout
								</Button>
							</div>
							<DrawerClose className="w-full">
								<Button variant="outline" className="w-full">
									close
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
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
								className="lg:w-[200px] text-white placeholder-white border-none bg-white/15"
							/>

							<Input
								required
								value={countryCode}
								onChange={(e) => setCountryCode(e.target.value)}
								placeholder="(country code)e.g 260"
								className="lg:w-[200px] border-none bg-white/15  text-white placeholder-white"
							/>

							<Button
								onClick={refetch}
								className="bg-white/15 flex hover:bg-white/20 items-center"
							>
								{isRefetching ? (
									""
								) : (
									<LucideSearch size={18} className="hover:cursor-pointer" />
								)}
								{isRefetching ? (
									<div className="flex gap-1 items-center">
										<LucideLoader2 size={13} className="animate-spin" />
										<h1 className="text-[13px]">loading</h1>
									</div>
								) : (
									"Search"
								)}
							</Button>
						</div>
						<div className="w-full px-4 flex flex-col gap-2 h-auto py-5 bg-white/10 shadow-sm rounded-xl">
							{isFetching || isRefetching ? (
								<Skeleton className="rounded-[50px] w-[30px] bg-white/20 h-[30px]" />
							) : (
								<Image
									src={`https://www.weatherbit.io/static/img/icons/${
										data && data?.data[0]?.weather?.icon
									}.png`}
									width={50}
									className="rounded-xl"
									height={50}
									alt="rain"
								/>
							)}

							{isFetching || isRefetching ? (
								<Skeleton className="w-full h-[150px] bg-white/20" />
							) : (
								<>
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
								</>
							)}
						</div>
					</div>
					<h1>Today{"'"}s Highlights</h1>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						{isFetching || isRefetching ? (
							<>
								{Array.from({ length: 6 }).map((index) => (
									<Skeleton key={index} className="bg-white/20 h-[100px] w-[180px] rounded-lg" />
								))}
							</>
						) : (
							<>
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
							</>
						)}
					</div>
				</div>
			</div>

			<div className="w-full lg:w-[400px] flex flex-col gap-4">
				<WeatherForecast />
			</div>
		</div>
	);
}
