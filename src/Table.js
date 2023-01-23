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
        </table>
    )
}