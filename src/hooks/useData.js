import React, { useCallback, useState } from 'react';
const delay = ms => new Promise(res => setTimeout(res, ms));
function useData()	{
  const [loading, setLoading] = useState(false);
  const fetchDataHandler = useCallback(async (url, config="", applyData) => {
    setLoading(true);
    try {
      let response="";
      response = config !== "" ? await fetch(url,config) : await fetch(url);
      await delay(2000);
      const data = await response.json();
      setLoading(false);
      applyData(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  },[])
  return { fetchDataHandler, loading };
}

export default useData;