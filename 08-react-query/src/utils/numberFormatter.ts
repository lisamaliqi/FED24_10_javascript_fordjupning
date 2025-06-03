/**
 * This is a utility function that takes a number and returns a nicely formatted string,
 * with proper digit grouping (e.g., thousands separators) based on the user's locale.
 */

export const numberFormat = (num: number) => {
	return new Intl.NumberFormat().format(num);
};
