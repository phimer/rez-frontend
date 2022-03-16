import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Recipes from './components/Recipes'
import AddRecipe from './components/AddRecipe'
import UpdateRecipe from './components/UpdateRecipe'
import Footer from './components/Footer'
import About from './components/About'

const BACKEND_ADDRESS = 'http://localhost:8080/api'

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false) //showAddTask is boolean, setShowAddTask is function to change boolean 

  const [showAddRecipe, setShowAddRecipe] = useState(false)

  const [recipes, setRecipes] = useState([])



  //not really sure
  useEffect(() => {
    getRecipesAndSetState()
  }, [])


  const getRecipesAndSetState = async () => {
    console.log('useEffect')
    const recipesFromServer = await fetchRecipes()
    setRecipes(recipesFromServer)
  }


  //Fetch Recipes
  const fetchRecipes = async () => {

    const res = await fetch('http://localhost:8080/api/recipes')
    const data = await res.json()

    return data
  }

  //Fetch Recipe
  const fetchRecipe = async (id) => {

    console.log(id)

    const res = await fetch(`http://localhost:8080/api/recipe/${id}`)
    const data = await res.json()

    return data
  }



  //Add Recipe
  const addRecipe = async (recipe) => {

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })

    const data = await res.json()

    setRecipes([...recipes, data]) //... add onto existing tasks

    console.log(recipe);


  }

  // Delete Recipe
  const deleteRecipe = async (id) => {

    console.log('delete', id);

    const recipe = {
      id: Number(id)
    }

    const json = JSON.stringify(recipe)

    console.log(recipe)

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: json
    })

    console.log('res; ', res);

    if (res.status === 200) {
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } else {
      console.log('delete unsuccessful')
      //some alert on screen
    }


  }

  // Update Recipe
  const updateRecipe = async (recipe) => {

    console.log('update', recipe.id);

    console.log(recipe)

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })

    const data = await res.json()
    console.log('data: ', data);

    getRecipesAndSetState()

  }


  return (
    <Router>

      <div className='container'>

        <Header onAdd={() => setShowAddRecipe(!showAddRecipe)} showAdd={showAddRecipe} />

        <Routes>
          <Route path='/' exact element={
            (
              <>
                {showAddRecipe && <AddRecipe onAdd={addRecipe} />}


                {/* {recipes.length > 0 ? <Recipes recipes={recipes} onDelete={deleteTask} onToggle={showRecipe} /> : 'No tasks here'} */}
                <Recipes recipes={recipes} onToggle={fetchRecipe} onDelete={deleteRecipe} onUpdate={updateRecipe} />

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
