import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"

const swapi = "https://swapi.dev/api/"

export default function StarWars() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    async function executeSearch(e) {
        e.preventDefault();
        setLoading(true);
        // To search for something on SWAPI: https://swapi.dev/api/people/?search=r2
        // const informationToGet = "https://swapi.dev/api/people/?search=" + input
        const informationToGet = "https://swapi.dev/api/people/?search="
        // results = getInformation(informationToGet);
        const response = await axios.get(informationToGet);
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
    }

    useEffect(() => {
        async function initialStart() {
            console.log("Initial start sequence has started.")
            setLoading(true);
            const informationToGet = "https://swapi.dev/api/people/?search="
            // results = getInformation(informationToGet);
            const response = await axios.get(informationToGet);
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
            setLoading(false)
        }
        initialStart();
    }, [])

    const spinnerAndTable = () => {
        if (loading) {
            return (
                <div>
                    <div className="spinner-border text-primary" role="status"></div>
                    <div>Loading....</div>
                </div>
            )
        }
        return (
            <Table
                input={input}
                setInput={setInput}
                results={results}
                setResults={setResults}
            />
        )
    }

    return (
        <>
            <div>
                <h1>Star Wars API</h1>
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
            <button type="button" className="btn btn-primary mt-3 justify-content-md-center" onClick={executeSearch}>Search</button>
            {spinnerAndTable()}
            {/* <Table
                input={input}
                setInput={setInput}
                results={results}
                setResults={setResults}
            /> */}
        </>
    )
}