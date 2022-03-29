import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Recipes from './components/Recipes'
import AddRecipe from './components/AddRecipe'
import SearchRecipe from './components/SearchRecipe'
import LoginHeader from './components/LoginHeader'
import Footer from './components/Footer'
import About from './components/About'
import LoginForm from './components/LoginForm'

//Remote Backend
const BACKEND_ADDRESS = 'https://flavorofthemonth.de/api'

//Local Backend
//const BACKEND_ADDRESS = 'http://127.0.0.1:8080/api'

const App = () => {

  const [recipes, setRecipes] = useState([])
  const [showAddRecipe, setShowAddRecipe] = useState(false)

  const [userLoginErrorMessage, setUserLoginErrorMessage] = useState('')
  const [recipeErrorMessage, setRecipeErrorMessage] = useState({ id: '', message: '' })
  const [addNewRecipeErrorMessage, setAddNewRecipeErrorMessage] = useState('');

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [showLoginUser, setShowLoginUser] = useState(false)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState('')

  const [showSearchRecipe, setShowSearchRecipe] = useState(false)
  const [searchErrorMessage, setSearchErrorMessage] = useState('')






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

    const res = await fetch(`${BACKEND_ADDRESS}/recipe/${id}`)
    const data = await res.json()

    return data
  }



  //Add Recipe
  const addRecipe = async (recipe) => {

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

    const json = JSON.stringify(recipe)

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: json
    })

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

    const res = await fetch(`${BACKEND_ADDRESS}/recipe`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(recipe)
    })

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

  // Search Recipe
  const searchRecipe = async () => {
    console.log('comming soon')
  }

  // Login User
  const loginUser = async (loginData) => {

    setUserLoginErrorMessage('');

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
      setUserLoginErrorMessage('Wrong Username or Password')
    }
  }

  // Create User and login
  const createUser = async (userData) => {

    const res = await fetch(`${BACKEND_ADDRESS}/user`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (res.status === 200) {

      loginUser(userData)

    } else if (res.status === 400) {
      setUserLoginErrorMessage('Username already exists')
    }


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
        {/* <p id="top-warning">Under Construction</p> */}

        <div className='login-header-div'>
          <LoginHeader onLoginClick={() => setShowLoginUser(!showLoginUser)} showLogin={showLoginUser} login={loginUser}
            userLoggedIn={userLoggedIn} onLogout={logoutUser} currentUser={currentLoggedInUser} />

          {showLoginUser && <LoginForm onLogin={loginUser} onCreate={createUser} message={userLoginErrorMessage} setMessage={setUserLoginErrorMessage} />}
        </div>


        <Routes>
          <Route path='/' exact element={
            (
              <>
                <Header setShowAdd={setShowAddRecipe} showAdd={showAddRecipe}
                  setShowSearch={setShowSearchRecipe} showSearch={showSearchRecipe} />

                <div className='container'>

                  {showSearchRecipe && <SearchRecipe onSearch={searchRecipe} errorMessage={searchErrorMessage} />}

                  {showAddRecipe && <AddRecipe onAdd={addRecipe} errorMessage={addNewRecipeErrorMessage} />}

                  <Recipes recipes={recipes} onToggle={fetchRecipe} onDelete={deleteRecipe} onUpdate={updateRecipe} errorMessage={recipeErrorMessage} />
                </div>
              </>
            )
          } />
          <Route path='/about' element={<About />} />
        </Routes>

      </div>
      <Footer />


    </Router>
  )
}





export default App;
