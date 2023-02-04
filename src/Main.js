import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"
import headerimage from "./images/Star_Wars_Logo.svg.png"

export default function StarWars() {
    const [input, setInput] = useState("");
    const [url, setUrl] = useState("https://swapi.dev/api/people/?search=");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [previousPage, setPreviousPage] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [isSearchData, setIsSearchData] = useState(false);
    const [displayPreviousButton, setdisplayPreviousButton] = useState(false);
    const [displayNextButton, setdisplayNextButton] = useState(true);

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUrl(`https://swapi.dev/api/people/?search=${input}`);
        setIsSearchData(true);
    }

    useEffect(() => {
        async function initialStart() {
            setLoading(true);
            const response = await axios.get(url);
            setPreviousPage(response.data.previous);
            setNextPage(response.data.next);
            for (let i = 0; i < response.data.results.length; i++) {
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
            setPageCount(Math.ceil((response.data.count / 10)) + 1);
        }
        initialStart();
    }, [url])

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
                results={results}
                setLoading={setLoading}
                nextPage={nextPage}
                previousPage={previousPage}
                setUrl={setUrl}
                pageCount={pageCount}
                isSearchData={isSearchData}
                displayPreviousButton={displayPreviousButton}
                setdisplayPreviousButton={setdisplayPreviousButton}
                displayNextButton={displayNextButton}
                setdisplayNextButton={setdisplayNextButton}
            />
        )
    }

    return (
        <>
            <div>
                <div>
                    <img id="header_image" alt="Star Wars API" src={headerimage}></img>
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