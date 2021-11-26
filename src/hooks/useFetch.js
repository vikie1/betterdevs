import {useState, useEffect} from "react";

export const useFetch = (url, {props}) => {
    //the return stuff
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=> {
      const abbortController = new AbortController();
      props.signal = abbortController.signal;

      //will be using fetch for the requests.
      fetch(url, {props})
      .then((res) => {
          if (!res.ok) {
              throw Error("Something is not right");;
          }
          return res.json()
      })
      .then((data) => {
          if(!data) return ; //could be because of a post or put that didn't return anything
          setData(prevData => data);
      })
      .catch((error) => {
          setError(prevError => error.message);
      });

      return () => abbortController.abort();
  }, [props, url]);

  return {data, error};
}