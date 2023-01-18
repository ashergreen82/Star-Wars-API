import React from 'react'
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"

const swapi = "https://swapi.dev/api/"

export default function StarWars() {
    const [input, setInput] = useState("");

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

    function executeSearch() {
        console.log("Value entered =", { input })
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
                    placeholder="What would you like to know about the Star Wars Universe?"
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