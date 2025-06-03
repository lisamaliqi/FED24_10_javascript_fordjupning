import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, //don't refetch when user refocuses on app (maybe if they leave the tab and then come back)
			staleTime: 1000 * 60 * 15, // 15 minutes, won't refresh data automatically within 15 min bc it is seen as fresh
			gcTime: 1000 * 60 * 60, // 1 hour
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);
