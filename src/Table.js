import axios from 'axios';

export default function Table({ input, setInput, results, setResults }) {

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

    function planetData(homeworld) {
        console.log("Planet data executed")
        const informationToGet = "https://swapi.dev/api/planet/?search="
        const planetResult = axios.get(homeworld)
        console.log("Species: ", planetResult)
    }

    function species(species) {
        console.log("Species data executed")
        const informationToGet = "https://swapi.dev/api/species/?search="
        const planetResult = axios.get(species)
        console.log("Species: ", planetResult)
    }

    console.log("Table Results: ", results)
    return (
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
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-md-center mt-3">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item"><a className="page-link" href="#">6</a></li>
                    <li className="page-item"><a className="page-link" href="#">7</a></li>
                    <li className="page-item"><a className="page-link" href="#">8</a></li>
                    <li className="page-item"><a className="page-link" href="#">9</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </table>
    )
}