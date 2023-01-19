import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"

const swapi = "https://swapi.dev/api/"

export default function StarWars() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState();

    axios.get(swapi)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

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

    function executeSearch() {
        // To search for something on SWAPI: https://swapi.dev/api/people/?search=r2
        const informationToGet = "https://swapi.dev/api/people/?search=" + input
        results = getInformation(informationToGet);
        // const results = axios.get(informationToGet)
        console.log("Value entered =", input);
        console.log("Value to be searched: ", informationToGet);
        console.log("Results object: ", results);
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
            />
        </>
    )
}