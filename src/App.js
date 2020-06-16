import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThingsTable from './components/ThingsTable'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'

const url = 'http://localhost:4000/api/'
// const url = 'http://simplelistserver-env.eba-eny7zm3e.eu-central-1.elasticbeanstalk.com/api/'

const App = () => {

  // const dummyData = [
  //   { id: 1, name: 'DUMMY Book', description: `It's a book` },
  //   { id: 2, name: 'DUMMY Game', description: `It's a game` },
  //   { id: 3, name: 'DUMMY Spoon', description: `It's not a knife` }
  // ]

  const dummyData = []

  useEffect(() => {
    axios.get(url).then((res) => {
      // setLoading(false)
      setThings(res.data)
    })
  }, [])

  const [things, setThings] = useState(dummyData)
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
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Simple List of Things</h1>
          </div>
        </div>
      </section>

      {
        !editing
          ? (
            <React.Fragment>
              <h2>Add thing</h2>
              <AddForm addThing={addThing} />
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <h2>Edit thing</h2>
              <EditForm setEditing={setEditing} currentThing={currentThing} updateThing={updateThing} />
            </React.Fragment>
          )
      }

      <h2>View things</h2>
      <ThingsTable things={things} editRow={editRow} delThing={delThing} />
    </React.Fragment>
  )
}

export default App