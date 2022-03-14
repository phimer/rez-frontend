import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Recipes from './components/Recipes'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


const App = () => {

  const [showAddTask, setShowAddTask] = useState(false) //showAddTask is boolean, setShowAddTask is function to change boolean 

  const [recipes, setRecipes] = useState([])


  useEffect(() => {

    const getTasks = async () => {
      const recipesFromServer = await fetchRecipes()
      setRecipes(recipesFromServer)
    }
    getTasks()
  }, [])

  //Fetch Recipes
  const fetchRecipes = async () => {
    console.log('fetchRecipes')
    const res = await fetch('http://localhost:8080/api/recipes')
    const data = await res.json()
    console.log(data)

    return data
  }

  //Fetch Recipe
  const fetchRecipe = async (id) => {
    console.log('fetchRecipe')
    const res = await fetch(`http://localhost:8080/api/recipe/${id}`)
    const data = await res.json()
    console.log(data)

    return data
  }



  //Add Task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setRecipes([...recipes, data]) //... add onto existing tasks

    console.log(task);
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setRecipes([...recipes, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    console.log('delete', id);
    setRecipes(recipes.filter((task) => task.id !== id));
  }

  // Toggle reminder (update)
  const toggleReminder = async (id) => {
    console.log(id);

    const taskToToggle = await fetchRecipe(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/taks/${id}`, {
      method: 'PUT',
      header: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })


    const data = await res.json()

    setRecipes(recipes.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task));

  }

  return (
    <Router>

      <div className='container'>

        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
          <Route path='/' exact element={
            (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}


                {/* {recipes.length > 0 ? <Recipes recipes={recipes} onDelete={deleteTask} onToggle={showRecipe} /> : 'No tasks here'} */}
                <Recipes recipes={recipes} onDelete={deleteTask} onToggle={fetchRecipe} />

              </>
            )

          } />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}





export default App;
