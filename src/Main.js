import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "./Table"
import headerimage from "./images/Star_Wars_Logo.svg.png"
import { API_BASE_URL } from './config';

export default function StarWars() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [previousPage, setPreviousPage] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [isSearchData, setIsSearchData] = useState(false);
    const [displayPreviousButton, setdisplayPreviousButton] = useState(false);
    const [displayNextButton, setdisplayNextButton] = useState(true);
    
    // Helper function to get data through the proxy
    const fetchData = async (url) => {
        try {
            setLoading(true);
            // If it's a relative URL (for pagination), prepend our API base URL
            const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.replace(/^https?:\/\/swapi\.dev\/api\//, '')}`;
            const response = await axios.get(fullUrl);
            
            // Process the data
            const results = response.data.results || [];
            
            // Update pagination
            setNextPage(response.data.next || "");
            setPreviousPage(response.data.previous || "");
            setPageCount(Math.ceil((response.data.count / 10)) + 1);
            
            // Process homeworld and species for each character
            const processedResults = await Promise.all(
                results.map(async (character) => {
                    try {
                        const [planetRes, speciesRes] = await Promise.all([
                            character.homeworld ? axios.get(character.homeworld) : { data: { name: 'Unknown' } },
                            character.species && character.species.length > 0 
                                ? axios.get(character.species[0])
                                : { data: { name: 'Human' } }
                        ]);
                        
                        return {
                            ...character,
                            homeworld: planetRes.data.name,
                            species: speciesRes.data.name
                        };
                    } catch (error) {
                        console.error('Error processing character:', error);
                        return {
                            ...character,
                            homeworld: 'Unknown',
                            species: 'Unknown'
                        };
                    }
                })
            );
            
            setResults(processedResults);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    function handleChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSearchQuery(input);
        fetchData(`/people/?search=${encodeURIComponent(input)}`);
        setIsSearchData(true);
    }

    // Initial load
    useEffect(() => {
        fetchData('/people/');
    }, [])

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
                onPageChange={fetchData}
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