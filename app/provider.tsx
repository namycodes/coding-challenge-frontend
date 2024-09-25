"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<WeatherProvider>{children}</WeatherProvider>
		</QueryClientProvider>
	);
}

interface WeatherProps {
	city: string;
	countryCode: string;
	setCountryCode: Dispatch<SetStateAction<string>>;
	setCity: Dispatch<SetStateAction<string>>;
}

const WeatherContext = createContext<WeatherProps>({
	city: "",
	countryCode: "",
	setCity: () => {},
	setCountryCode: () => {},
});
const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
	const [city, setCity] = useState<string>("Lusaka");
	const [countryCode, setCountryCode] = useState<string>("260");
	return (
		<WeatherContext.Provider
			value={{ countryCode, setCountryCode, city, setCity }}
		>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeatherHook = () => useContext(WeatherContext);
