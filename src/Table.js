import React from 'react';

export default function Table({ 
    input, 
    results, 
    setLoading, 
    previousPage, 
    nextPage, 
    onPageChange, 
    pageCount, 
    isSearchData, 
    displayPreviousButton, 
    setdisplayPreviousButton, 
    displayNextButton, 
    setdisplayNextButton 
}) {

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
        onPageChange(previousPage);
    }

    const getNextPage = (e) => {
        e.preventDefault();
        if (!nextPage) return;
        onPageChange(nextPage);
    }

    function pageNavigation(e) {
        e.preventDefault();
        const buttonPressed = e.target.innerText;
        if (isSearchData) {
            onPageChange(`/people/?search=${encodeURIComponent(input)}&page=${buttonPressed}`);
        } else {
            onPageChange(`/people/?page=${buttonPressed}`);
        }
    }

    function buttonsArray() {
        let buttonList = [];
        for (let i = 1; i < pageCount; i++) {
            buttonList.push(
                <li key={i} className="page-item">
                    <button className="page-link" onClick={(e) => pageNavigation(e)}>
                        {i}
                    </button>
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
                    {displayPreviousButton && (
                        <li className="page-item">
                            <button className="page-link" id="previousBtn" onClick={getPrevPage}>Previous</button>
                        </li>
                    )}
                    {buttonsArray()}
                    {displayNextButton && (
                        <li className="page-item">
                            <button className="page-link" id="nextBtn" onClick={getNextPage}>Next</button>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    )
}