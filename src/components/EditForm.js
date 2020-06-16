import React, { useState, useEffect } from 'react'

const EditForm = props => {
    const [thing, setThing] = useState(props.currentThing)
    useEffect(() => {
        setThing(props.currentThing)
    }, [props])

    const handleInputChange = event => {
        const { name, value } = event.target

        setThing({ ...thing, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        props.updateThing(thing.id, thing)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Id</label>
            <input type="text" name="id" value={thing.id} readOnly />
            <label>Name</label>
            <input type="text" name="name" value={thing.name} onChange={handleInputChange} />
            <label>Description</label>
            <input type="text" name="description" value={thing.description} onChange={handleInputChange} />
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link">Add thing</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light" onClick={() => props.setEditing(false)}>Cancel</button>
                </div>
            </div>

        </form>
    )
}

export default EditForm