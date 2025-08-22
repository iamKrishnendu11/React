import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    
    useEffect(()=>{
        // Using a working currency API that provides similar data structure
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
        .then((res)=>{
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((res)=>{
            setData(res.rates)
            console.log("API Response:", res.rates);
        })
        .catch((error) => {
            console.error("Error fetching currency data:", error);
            // Fallback to some common currencies if API fails
            setData({
                usd: 1,
                eur: 0.85,
                gbp: 0.73,
                jpy: 110.0,
                inr: 74.0,
                aud: 1.35,
                cad: 1.25
            });
        })
    },[currency])
    
    return data
}
export default useCurrencyInfo;