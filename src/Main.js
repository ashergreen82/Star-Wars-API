import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"

const swapi = "https://swapi.dev/api/"

export default function StarWars() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    // axios.get(swapi)
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
        // console.log(e)
        // console.log(e.target.value)
        // console.log("This is what you would like to know about the Star Wars Universe: ", { input })
    }

    function getInformation(informationToGet) {
        console.log("getInformation function executed")
        axios.get(informationToGet)
            .then(response => {
                console.log("getInformation function results: ", response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    async function executeSearch(e) {
        e.preventDefault();
        // To search for something on SWAPI: https://swapi.dev/api/people/?search=r2
        // const informationToGet = "https://swapi.dev/api/people/?search=" + input
        const informationToGet = "https://swapi.dev/api/people/?search="
        // results = getInformation(informationToGet);
        const response = await axios.get(informationToGet);
        console.log("Results object: ", response.data);
        console.log("Results object 1: ", response.data.results);
        for (let i = 0; i < response.data.results.length; i++) {
            // results[i]
            const planetLocation = response.data.results[i].homeworld
            const speciesLocation = response.data.results[i].species
            const planet = await axios.get(planetLocation);
            const species = await axios.get(speciesLocation);
            console.log("Planet Search: ", planetLocation);
            console.log("Species Search: ", speciesLocation);
            console.log("Planet: ", planet.data.name);
            console.log("species: ", species.data.name);
            console.log("Results extract item: ", i);

        }
        // console.log("Value entered =", input);
        // console.log("Value to be searched: ", informationToGet);


        setResults(response.data.results)
        console.log("Results.data.results = ", { results: response })
        // console.log("value results: ", results);
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
                <button type="button" class="btn btn-primary mt-3" onClick={executeSearch}>Search</button>
            </div>
            <Table
                input={input}
                setInput={setInput}
                results={results}
                setResults={setResults}
            />
        </>
    )
}