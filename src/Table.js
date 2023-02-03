import axios from 'axios';
import { useRef, useEffect, useState } from 'react';

export default function Table({ input, setInput, results, setResults, loading, setLoading, numberOfButtonsNeeded, previousPage, setPreviousPage, nextPage, setNextPage, setUrl, Url, setPageCount, pageCount, isSearchData, setIsSearchData, displayPreviousButton, setdisplayPreviousButton, displayNextButton, setdisplayNextButton }) {

    const displayData = results.map((result, key) => {
        return (
            <tr key={key} id={result.id}>
                <td>{result.name}</td>
                <td>{result.birth_year}</td>
                <td>{result.height}</td>
                <td>{result.mass}</td>
                <td>{result.homeworld}</td>
                <td>{result.species}</td>
            </tr>
        )
    });

    const getPrevPage = (e) => {
        e.preventDefault();
        if (!previousPage) return;
        setUrl(previousPage);
    }

    const getNextPage = (e) => {
        e.preventDefault();
        if (!nextPage) return;
        setUrl(nextPage);
    }

    async function pageNavigation(e) {
        e.preventDefault();
        setLoading(true);
        const buttonPressed = e.target.innerText;
        let tempValue = 0
        let informationToGet = ""
        if (isSearchData == true) {
            informationToGet = "https://swapi.dev/api/people/?search=" + input + "&page=" + buttonPressed;
        } else {
            informationToGet = "https://swapi.dev/api/people/?page=" + buttonPressed;
        }
        setUrl(informationToGet);
    }

    async function pageNavigationButtons() {
        numberOfButtonsNeeded = Math.ceil(pageCount / 10)
        console.log("Number of buttons needed: ", numberOfButtonsNeeded)
        console.log("Page count is: ", pageCount)
        console.log("Table Results: ", results)
    }

    function buttonsArray() {
        console.log("buttonsArray has executed")
        let buttonList = [];
        for (let i = 1; i < pageCount; i++) {
            buttonList.push(
                <li key={i} className="page-item">
                    <a className="page-link" href="#" onClick={(e) => pageNavigation(e)}>
                        {i}
                    </a>
                </li>
            );
        }
        if (!previousPage) {
            setdisplayPreviousButton(false);
        } else {
            setdisplayPreviousButton(true);
        }
        if (!nextPage) {
            setdisplayNextButton(false);
        } else {
            setdisplayNextButton(true);
        }
        return buttonList;
    }

    return (
        <>
            <table className="table table-bordered table-striped table-primary mt-3">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Height</th>
                        <th scope="col">Mass</th>
                        <th scope="col">Homeworld</th>
                        <th scope="col">Species</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-md-center mt-3">
                    {/* {numberOfButtonsNeeded = Math.ceil(pageCount / 10)} */}
                    {console.log("Number of buttons needed: ", numberOfButtonsNeeded)}
                    {console.log("Page count is: ", pageCount)}
                    {console.log("Table Results: ", results)}
                    {console.log("This is the next page: ", nextPage)};
                    {console.log("This is the previous page: ", previousPage)};
                    {displayPreviousButton && (
                        <li className="page-item">
                            <a className="page-link" id="previousBtn" onClick={getPrevPage}>Previous</a>
                        </li>
                    )}
                    {buttonsArray()}
                    {displayNextButton && (
                        <li className="page-item">
                            <a className="page-link" id="nextBtn" onClick={getNextPage}>Next</a>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}