import axios from 'axios';
import { useRef, useEffect, useState } from 'react';

export default function Table({ input, setInput, results, setResults, loading, setLoading }) {
    const [currentPage, setcurrentPage] = useState("1");

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

    async function pageNavigation(e) {
        e.preventDefault();
        setLoading(true);
        const buttonPressed = e.target.innerText;
        switch (buttonPressed) {
            case Number(buttonPressed) < 1 || buttonPressed === "null":
                setcurrentPage(buttonPressed = "1");
            case Number(buttonPressed) > 9 || buttonPressed === "null":
                setcurrentPage(buttonPressed = "8")
            case "Previous":
                setcurrentPage(currentPage.toString(Number(currentPage)) - 1);
            case "Next":
                setcurrentPage(currentPage.toString(Number(currentPage)) + 1);
            default:
                setcurrentPage(buttonPressed);
        }
        // if (buttonPressed = "previous"){
        //     setcurrentPage(buttonPressed - 1)   
        // }
        // if (buttonPressed = "next"){
        //     setcurrentPage(buttonPressed + 1)
        // }
        // if (buttonPressed < 0){
        //     setcurrentPage(buttonPressed = 0)
        // }
        // if (buttonPressed > 9){
        //     setcurrentPage(buttonPressed = 8)
        // }else {
        //     setcurrentPage(buttonPressed);
        // }
        const informationToGet = "https://swapi.dev/api/people/?page="
        const pagePointer = await axios.get(informationToGet + buttonPressed);
        for (let i = 0; i < pagePointer.data.results.length; i++) {
            // results[i]
            const planetLocation = pagePointer.data.results[i].homeworld;
            const speciesLocation = pagePointer.data.results[i].species;
            const planet = await axios.get(planetLocation);
            const species = await axios.get(speciesLocation);
            pagePointer.data.results[i].homeworld = planet.data.name;
            if (speciesLocation.length) pagePointer.data.results[i].species = species.data.name;
            else pagePointer.data.results[i].species = "Human";
        }
        console.log("pageNavigation has executed");
        console.log("This is the value of e: ", { e });
        console.log("this is the vlaue of e as not an object: ", e)
        console.log(e.target.href, "was pressed");
        console.log(e.target.innerText, "was pressed");
        console.log("Page: ", pagePointer);
        console.log("Page: ", pagePointer.data);
        console.log("Page: ", { pagePointer });
        console.log("Page: ", pagePointer.data.results[0]);
        setResults(pagePointer.data.results);
        setLoading(false);
    }

    console.log("Table Results: ", results)
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
                    <li className="page-item"><a className="page-link" href="previous" onClick={pageNavigation}>Previous</a></li>
                    <li className="page-item"><a className="page-link" href="1" onClick={pageNavigation}>1</a></li>
                    <li className="page-item"><a className="page-link" href="2" onClick={pageNavigation}>2</a></li>
                    <li className="page-item"><a className="page-link" href="3" onClick={pageNavigation}>3</a></li>
                    <li className="page-item"><a className="page-link" href="4" onClick={pageNavigation}>4</a></li>
                    <li className="page-item"><a className="page-link" href="5" onClick={pageNavigation}>5</a></li>
                    <li className="page-item"><a className="page-link" href="6" onClick={pageNavigation}>6</a></li>
                    <li className="page-item"><a className="page-link" href="7" onClick={pageNavigation}>7</a></li>
                    <li className="page-item"><a className="page-link" href="8" onClick={pageNavigation}>8</a></li>
                    <li className="page-item"><a className="page-link" href="9" onClick={pageNavigation}>9</a></li>
                    <li className="page-item"><a className="page-link" href="next" onClick={pageNavigation}>Next</a></li>
                </ul>
            </nav>
        </>
    )
}