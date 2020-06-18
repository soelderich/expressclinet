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
        <div className="box">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Id</label>
                    <div className="control">
                        <input className="input" type="text" name="id" value={thing.id} disabled />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="name" value={thing.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input className="input" type="text" name="description" value={thing.description} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Add thing</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={() => props.setEditing(false)}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditForm