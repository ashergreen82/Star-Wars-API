import axios from 'axios';
import { useRef, useEffect, useState } from 'react';

export default function Table({ input, setInput, results, setResults, loading, setLoading, numberOfButtonsNeeded, previousPage, setPreviousPage, nextPage, setNextPage, setUrl, Url, setPageCount, pageCount, isSearchData, setIsSearchData }) {
    // const [numberOfButtonsNeeded, setnumberOfButtonsNeeded] = useState("1");
    // let numberOfButtonsNeeded = "1"
    const [displayPreviousButton, setdisplayPreviousButton] = useState(true);
    const [displayNextButton, setdisplayNextButton] = useState(true);

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
        // if (!previousPage) return;
        if (!previousPage) {
            setdisplayPreviousButton(false);
            return;
        }
        setUrl(previousPage);
    }

    const getNextPage = (e) => {
        e.preventDefault();
        // if (!nextPage) return;
        if (!nextPage) {
            setdisplayNextButton(false);
            return;
        }
        setUrl(nextPage);
    }

    async function pageNavigation(e) {
        e.preventDefault();
        setLoading(true);
        const buttonPressed = e.target.innerText;
        // `https://swapi/dev/api/people/?search=${input}&page=${buttonPressed}`
        let tempValue = 0
        let informationToGet = ""
        debugger;
        if (isSearchData == true) {
            informationToGet = "https://swapi.dev/api/people/?search=" + input + "&page=" + buttonPressed;
        } else {
            informationToGet = "https://swapi.dev/api/people/?page=" + buttonPressed;
        }
        setUrl(informationToGet);
    }
    // if (buttonPressed = "previous"){
    //     setnumberOfButtonsNeeded(buttonPressed - 1)   
    // }
    // if (buttonPressed = "next"){
    //     setnumberOfButtonsNeeded(buttonPressed + 1)
    // }
    // if (buttonPressed < 0){
    //     setnumberOfButtonsNeeded(buttonPressed = 0)
    // }
    // if (buttonPressed > 9){
    //     setnumberOfButtonsNeeded(buttonPressed = 8)
    // }else {
    //     setnumberOfButtonsNeeded(buttonPressed);
    // }
    // const informationToGet = "https://swapi.dev/api/people/?page="
    // const pagePointer = await axios.get(informationToGet + numberOfButtonsNeeded);
    // const pagePointer = await axios.get(informationToGet);
    // for (let i = 0; i < pagePointer.data.results.length; i++) {
    //     // results[i]
    //     const planetLocation = pagePointer.data.results[i].homeworld;
    //     const speciesLocation = pagePointer.data.results[i].species;
    //     const planet = await axios.get(planetLocation);
    //     const species = await axios.get(speciesLocation);
    //     pagePointer.data.results[i].homeworld = planet.data.name;
    //     if (speciesLocation.length) pagePointer.data.results[i].species = species.data.name;
    //     else pagePointer.data.results[i].species = "Human";
    // }
    // console.log("pageNavigation has executed");
    // console.log("This is the value of e: ", { e });
    // console.log("this is the value of e as not an object: ", e)
    // console.log(e.target.href, "was pressed");
    // console.log(e.target.innerText, "was pressed");
    // console.log("Page: ", pagePointer);
    // console.log("Page: ", pagePointer.data);
    // console.log("Page: ", { pagePointer });
    // console.log("Page: ", pagePointer.data.results[0]);
    //     setResults(pagePointer.data.results);
    //     setNextPage(nextPage);
    //     setPreviousPage(previousPage);
    //     setLoading(false);
    // }
    async function pageNavigationButtons() {
        numberOfButtonsNeeded = Math.ceil(pageCount / 10)
        console.log("Number of buttons needed: ", numberOfButtonsNeeded)
        console.log("Page count is: ", pageCount)
        console.log("Table Results: ", results)
    }

    // const buttonsArray = numberOfButtonsNeeded.map((d) => <li className="page-item"><a className="page-link" href="1" onClick={pageNavigation}>1</a></li>)
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
                    <li className="page-item"><a className="page-link" onClick={getPrevPage}>Previous</a></li>
                    {buttonsArray()}
                    <li className="page-item"><a className="page-link" onClick={getNextPage}>Next</a></li>
                </ul>
            </nav>
        </>
    )
}

{/* <nav aria-label="Page navigation">
<ul className="pagination justify-content-md-center mt-3">
    <li className="page-item"><a className="page-link" onClick={getPrevPage}>Previous</a></li>
    <li className="page-item"><a className="page-link" href="1" onClick={pageNavigation}>1</a></li>
    <li className="page-item"><a className="page-link" href="2" onClick={pageNavigation}>2</a></li>
    <li className="page-item"><a className="page-link" href="3" onClick={pageNavigation}>3</a></li>
    <li className="page-item"><a className="page-link" href="4" onClick={pageNavigation}>4</a></li>
    <li className="page-item"><a className="page-link" href="5" onClick={pageNavigation}>5</a></li>
    <li className="page-item"><a className="page-link" href="6" onClick={pageNavigation}>6</a></li>
    <li className="page-item"><a className="page-link" href="7" onClick={pageNavigation}>7</a></li>
    <li className="page-item"><a className="page-link" href="8" onClick={pageNavigation}>8</a></li>
    <li className="page-item"><a className="page-link" href="9" onClick={pageNavigation}>9</a></li>
    <li className="page-item"><a className="page-link" onClick={getNextPage}>Next</a></li>
</ul>
</nav> */}