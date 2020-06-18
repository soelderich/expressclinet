import React, { useState, useEffect } from 'react'

import ThingsTable from './components/ThingsTable'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'

import axios from 'axios'

const url = 'https://simple-list-server.herokuapp.com/api/'

const App = () => {

  useEffect(() => {
    axios.get(url).then((res) => {
      // setLoading(false)
      setThings(res.data)
    })
  }, [])

  const [things, setThings] = useState([])
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: undefined, name: '', username: '' }

  const [currentThing, setCurrentThing] = useState(initialFormState)

  const editRow = (thing) => {
    setEditing(true)

    setCurrentThing({ id: thing.id, name: thing.name, description: thing.description })
  }

  const addThing = thing => {
    axios.post(url, {
      name: thing.name,
      description: thing.description
    }).then((res) => {
      setThings([...things, res.data])
    })

  }

  const delThing = id => {
    axios.delete(`${url}${id}`).then((res) => {
      if (res.data === 1) {
        setThings(things.filter(thing => thing.id !== id))
      }
    })
  }

  const updateThing = (id, updatedThing) => {
    setEditing(false)
    axios.put(`${url}${id}`, {
      name: updatedThing.name,
      description: updatedThing.description
    }).then((res) => {
      if (res.data !== 0) {
        setThings(things.map(thing => (thing.id === id ? res.data : thing)))
      }
    })
  }

  return (
    <React.Fragment>

      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">List of Things</h1>
          </div>
        </div>
      </section>
      
      <section class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-half">
              {
                editing
                  ? (
                    <React.Fragment>
                      <h4 className="title is-4">Edit</h4>
                      <EditForm setEditing={setEditing} currentThing={currentThing} updateThing={updateThing} />
                    </React.Fragment>
                  )
                  : (
                    <React.Fragment>
                      <h4 className="title is-4">Add New</h4>
                      <AddForm addThing={addThing} />
                    </React.Fragment>
                  )
              }

              <br />
              <br />
              <h2 className="title is-2">View things</h2>
              <ThingsTable things={things} editRow={editRow} delThing={delThing} />
            </div>
          </div>
        </div>
      </section>


    </React.Fragment>
  )
}

export default App