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
        <form onSubmit={handleSubmit}>
            <label>Id</label>
            <input type="text" name="id" value={thing.id} readOnly />
            <label>Name</label>
            <input type="text" name="name" value={thing.name} onChange={handleInputChange} />
            <label>Description</label>
            <input type="text" name="description" value={thing.description} onChange={handleInputChange} />
            <button>Add Thing</button>
        </form>
    )
}

export default AddForm