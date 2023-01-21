export default function Table({ input, setInput }, { results, setResults }) {

    // const displayData = results.map(result, key) => (
    //     <tr key={key} id={results.id}
    //         <td>{results.data.results</td> 

    // )

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
            {/* <tbody>{displayData}</tbody> */}
            <tbody>
                <tr>
                    <td>{results}</td>
                </tr>
            </tbody>
        </table>
    )
}