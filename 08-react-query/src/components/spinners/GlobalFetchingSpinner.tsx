import { useIsFetching } from "@tanstack/react-query";
import CatSpinner from "./CatSpinner";


const GlobalFetchingSpinner = () => {
	const isFetching = useIsFetching();

	return isFetching
		? <CatSpinner />
		: null;
}

export default GlobalFetchingSpinner;
