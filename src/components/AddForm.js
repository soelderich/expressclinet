import React, { useState } from 'react'

const AddForm = (props) => {

    const initialFormState = { id: undefined, name: '', description: '' }
    const [thing, setThing] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setThing({ ...thing, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!thing.name || !thing.description) {
            return
        }

        props.addThing(thing)
        setThing(initialFormState)
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
                        <button className="button is-link">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddForm