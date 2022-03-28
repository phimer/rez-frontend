import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Recipes from './components/Recipes'
import AddRecipe from './components/AddRecipe'
import LoginHeader from './components/LoginHeader'
import Footer from './components/Footer'
import About from './components/About'
import LoginForm from './components/LoginForm'
const BACKEND_ADDRESS = 'https://flavorofthemonth.de/api'
//const BACKEND_ADDRESS = 'http://127.0.0.1:8080/api'

const App = () => {

  const [recipes, setRecipes] = useState([])
  const [showAddRecipe, setShowAddRecipe] = useState(false)

  const [wrongUsernamePasswordMessage, setWrongUsernamePasswordMessage] = useState('')
  const [recipeErrorMessage, setRecipeErrorMessage] = useState({ id: '', message: '' })
  const [addNewRecipeErrorMessage, setAddNewRecipeErrorMessage] = useState('');

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [showLoginUser, setShowLoginUser] = useState(false)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState('')







  const checkIfUserIsAuthenticated = async () => {

    // check if token is valid
    const res = await fetch(`${BACKEND_ADDRESS}/authenticate/valid`, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })

    if (res.status === 200) {
      setUserLoggedIn(true)
      getNameOfCurrentUser()
    }
  }


  const getNameOfCurrentUser = async () => {

    const res = await fetch(`${BACKEND_ADDRESS}/authenticate/username`, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })

    const data = await res.json()

    if (res.status === 200) {
      setCurrentLoggedInUser(capitalizeFirstLetter(data))
    }


  }


  //not really sure
  useEffect(() => {
    getRecipesAndSetState()
    checkIfUserIsAuthenticated()
  }, [])


  const getRecipesAndSetState = async () => {
    const recipesFromServer = await fetchRecipes()
    setRecipes(recipesFromServer)
  }


  //Fetch Recipes
  const fetchRecipes = async () => {

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`)
    const data = await res.json()

    return data
  }

  //Fetch Recipe
  const fetchRecipe = async (id) => {

    console.log(id)

    const res = await fetch(`${BACKEND_ADDRESS}/recipe/${id}`)
    const data = await res.json()

    return data
  }



  //Add Recipe
  const addRecipe = async (recipe) => {

    console.log('add: ', recipe)

    console.log(localStorage.getItem("token"))

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(recipe)
    })

    const data = await res.json()


    //actions depending on response:

    if (res.status === 200) {
      setRecipes([...recipes, data]) //... add onto existing tasks
      setShowAddRecipe(false)
    } else {
      if (res.status === 403) {
        setAddNewRecipeErrorMessage('You have to be logged in to add recipes.')
      } else {
        setAddNewRecipeErrorMessage('Internal Error. Try again.')
      }
      setTimeout(() => {
        setAddNewRecipeErrorMessage('')
      }, 3000);
    }



  }

  // Delete Recipe
  const deleteRecipe = async (recipe) => {

    console.log('delete', recipe.id);


    const json = JSON.stringify(recipe)

    console.log(recipe)
    console.log("localstorgae: " + localStorage.getItem("token"))

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: json
    })

    console.log('res; ', res);

    if (res.status === 200) {
      setRecipes(recipes.filter((r) => r.id !== recipe.id));
    } else if (res.status === 403) {
      setRecipeErrorMessage({ id: recipe.id, message: 'You cannot delete this recipe. Users can only edit or delete their own recipes.' })
    } else {
      setRecipeErrorMessage({ id: recipe.id, message: 'Delete unsuccessful.' })
    }

    clearEditDeleteErrorMessage();


  }

  // Update Recipe
  const updateRecipe = async (recipe) => {

    console.log('update', recipe.id);

    console.log(recipe)

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(recipe)
    })

    const data = await res.json()

    if (res.status === 200) {
      setRecipes(recipes.filter((r) => r.id !== recipe.id));
    } else if (res.status === 403) {
      setRecipeErrorMessage({ id: recipe.id, message: 'You cannot edit this recipe. Users can only edit or delete their own recipes.' })
    } else {
      setRecipeErrorMessage({ id: recipe.id, message: 'Edit unsuccessful.' })
    }

    clearEditDeleteErrorMessage();

    getRecipesAndSetState()

  }

  // Login User
  const loginUser = async (loginData) => {

    setWrongUsernamePasswordMessage('');

    const res = await fetch(`${BACKEND_ADDRESS}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })

    const data = await res.json()


    if (res.status === 200) {

      setShowLoginUser(false)
      setUserLoggedIn(true)
      localStorage.setItem("token", "Bearer " + data.jwt)
      setCurrentLoggedInUser(capitalizeFirstLetter(loginData.username))

    } else {
      setWrongUsernamePasswordMessage('Wrong Username or Password')
    }
  }

  // Create User and login
  const createUser = async (user) => {
    console.log('create user: ' + user.username, user.password)

    const res = await fetch(`${BACKEND_ADDRESS}/user`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()
    console.log(data)

    setCurrentLoggedInUser(capitalizeFirstLetter(user.username))
    setUserLoggedIn(true)
    setShowLoginUser(false)
  }

  // Logout User
  const logoutUser = async () => {
    localStorage.removeItem("token")
    setUserLoggedIn(false)
  }


  // Clear Error Messages
  const clearEditDeleteErrorMessage = () => {
    setTimeout(() => {
      setRecipeErrorMessage({ id: '', message: '' })
    }, 5000);
  }


  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Router>

      <div className='app'>

        <div className='login-header-div'>
          <LoginHeader onLoginClick={() => setShowLoginUser(!showLoginUser)} showLogin={showLoginUser} login={loginUser}
            userLoggedIn={userLoggedIn} onLogout={logoutUser} currentUser={currentLoggedInUser} />

          {showLoginUser && <LoginForm onLogin={loginUser} onCreate={createUser} message={wrongUsernamePasswordMessage} />}
        </div>

        <Header onAdd={() => setShowAddRecipe(!showAddRecipe)} showAdd={showAddRecipe} />

        <div className='container'>
          <Routes>
            <Route path='/' exact element={
              (
                <>
                  {showAddRecipe && <AddRecipe onAdd={addRecipe} errorMessage={addNewRecipeErrorMessage} />}

                  <Recipes recipes={recipes} onToggle={fetchRecipe} onDelete={deleteRecipe} onUpdate={updateRecipe} errorMessage={recipeErrorMessage} />
                </>
              )

            } />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </div>
      <Footer />


    </Router>
  )
}





export default App;
