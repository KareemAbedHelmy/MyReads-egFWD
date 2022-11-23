import  { useState, useEffect } from "react";

function useDebounce(value,delay){
    //use-debounce hook (reduces the API calls)
	 const [debouncedValue, setDebouncedValue] = useState(value);

      useEffect(() => {
		const timeOut = setTimeout(() => {
	 		setDebouncedValue(value);
	 	}, delay);

	 	return () => {
			clearTimeout(timeOut);
	 	};
	 }, [value, delay]);
     return debouncedValue;

}

export default useDebounce;