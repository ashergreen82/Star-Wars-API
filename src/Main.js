import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"
import background from "./images/background.jpg"
import headerimage from "./images/Star_Wars_Logo.svg.png"

const swapi = "https://swapi.dev/api/"

export default function StarWars() {
    const [input, setInput] = useState("");
    const [url, setUrl] = useState("https://swapi.dev/api/people/?search=");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [previousPage, setPreviousPage] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const currentPage = "1";

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUrl(`https://swapi.dev/api/people/?search=${input}`)
    }
    // async function executeSearch(e) {
    //     e.preventDefault();
    //     setLoading(true);
    //     // To search for something on SWAPI: https://swapi.dev/api/people/?search=r2
    //     const informationToGet = "https://swapi.dev/api/people/?search=" + input
    //     // const informationToGet = "https://swapi.dev/api/people/?search="
    //     // results = getInformation(informationToGet);
    //     const response = await axios.get(informationToGet);
    //     setPreviousPage(response.data.previous);
    //     setNextPage(response.data.next);
    //     for (let i = 0; i < response.data.results.length; i++) {
    //         const planetLocation = response.data.results[i].homeworld;
    //         const speciesLocation = response.data.results[i].species;
    //         const planet = await axios.get(planetLocation);
    //         const species = await axios.get(speciesLocation);
    //         response.data.results[i].homeworld = planet.data.name;
    //         if (speciesLocation.length) response.data.results[i].species = species.data.name;
    //         else response.data.results[i].species = "Human";
    //     }

    //     setResults(response.data.results);
    //     setLoading(false);
    // }

    useEffect(() => {
        async function initialStart() {
            console.log("Initial start sequence has started.")
            setLoading(true);
            const informationToGet = "https://swapi.dev/api/people/?search="
            // results = getInformation(informationToGet);
            const response = await axios.get(url);
            setPreviousPage(response.data.previous);
            setNextPage(response.data.next);
            console.log("This is the next page: ", nextPage);
            console.log("This is the previous page: ", previousPage);
            for (let i = 0; i < response.data.results.length; i++) {
                // results[i]
                const planetLocation = response.data.results[i].homeworld;
                const speciesLocation = response.data.results[i].species;
                const planet = await axios.get(planetLocation);
                const species = await axios.get(speciesLocation);
                response.data.results[i].homeworld = planet.data.name;
                if (speciesLocation.length) response.data.results[i].species = species.data.name;
                else response.data.results[i].species = "Human";
            }
            setResults(response.data.results);
            setLoading(false);
            setPageCount(response.data.count);
            console.log("Pagecount: ", pageCount);
            console.log("response: ", response);
        }
        initialStart();
    }, [url])

    // async function getPlanetAndSpecies() {
    //     for (let i = 0; i < response.data.results.length; i++) {
    //         // results[i]
    //         const planetLocation = response.data.results[i].homeworld;
    //         const speciesLocation = response.data.results[i].species;
    //         const planet = await axios.get(planetLocation);
    //         const species = await axios.get(speciesLocation);
    //         response.data.results[i].homeworld = planet.data.name;
    //         if (speciesLocation.length) response.data.results[i].species = species.data.name;
    //         else response.data.results[i].species = "Human";
    //     }
    // }

    const spinnerAndTable = () => {
        if (loading) {
            return (
                <div className='text-center'>
                    <div className="spinner-border text-white mt-3" role="status"></div>
                    <div className="text-white">Loading....</div>
                </div>
            )
        }
        return (
            <Table
                input={input}
                setInput={setInput}
                results={results}
                setResults={setResults}
                loading={loading}
                setLoading={setLoading}
                currentPage={currentPage}
                nextPage={nextPage}
                setNextPage={setNextPage}
                previousPage={previousPage}
                setPreviousPage={setPreviousPage}
                url={url}
                setUrl={setUrl}
                setPageCount={setPageCount}
                pageCount={pageCount}
            />
        )
    }

    return (
        <>
            <div>
                <div>
                    <img id="header_image" src={headerimage}></img>
                    {/* <h1>Star Wars API</h1> */}
                </div>
                <div className="user-input">
                    <input
                        id="searchRequest"
                        type="text"
                        className="form-control"
                        value={input}
                        onChange={handleChange}
                        placeholder="Which Star Wars character are you interested in learning about?"
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary mt-3 justify-content-md-center" onClick={handleSubmit}>Search</button>
                </div>
                {spinnerAndTable()}
            </div>
        </>
    )
}