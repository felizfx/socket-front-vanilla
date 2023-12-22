export default function keepNumbersOnly(inputString) {
	var result = inputString.replace(/[^0-9]/g, "");
	return Number(result);
}