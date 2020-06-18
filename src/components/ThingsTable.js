import React, { useState, useEffect } from 'react'

const ThingsTable = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.things.map(thing => (
                        <tr key={thing.id}>
                            <td>{thing.id}</td>
                            <td>{thing.name}</td>
                            <td>{thing.description}</td>
                            <td>
                                <button className="button" onClick={() => props.editRow(thing)}>Edit</button>
                                { " " }
                                <button className="button is-danger" onClick={() => props.delThing(thing.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default ThingsTable