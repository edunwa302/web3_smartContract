import { useEffect, useState } from "react";

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState("");
    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();
            if(data.length) {
                setGifUrl(data[0]?.images?.downsized_medium.url);
            } else {
                setGifUrl("https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif");
            }
        } catch (error) {
            setGifUrl("https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif");
        }
    }

    useEffect(() => {
        if(keyword) fetchGifs();
      }, [keyword])
    
      return gifUrl;
}
export default useFetch;