import { useEffect, useState } from "react";

function useCountries() {

    const [apiCountriesList, setApiCountriesList] = useState([]);
    const [apiCountriesListLoading, setApiCountriesListLoading] = useState('');

    const fetchCountriesList = async () => {
        setApiCountriesListLoading('loading')
        try{
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name')
            const data = await response.json();

            const countryName = data
                .map(country => country.name.common)
                .sort((a,b) => a.localeCompare(b));

            setApiCountriesList(countryName)
            localStorage.setItem('apiCountriesList', JSON.stringify(countryName))

            console.log(countryName);
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('apiCountriesList'))

        if(saved && saved.length > 0){
            setApiCountriesList(saved)
        } else{
            fetchCountriesList();
        }
    }, [])

  return {apiCountriesList, apiCountriesListLoading}
}

export default useCountries;
