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
//const BACKEND_ADDRESS = 'https://flavorofthemonth.de/api'

//Local Backend
const BACKEND_ADDRESS = 'http://127.0.0.1:8080/api'

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


  const [loadingSpinner, setLoadingSpinner] = useState(false)





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

    setLoadingSpinner(true)


    const res = await fetch(`${BACKEND_ADDRESS}/recipe`)
    const data = await res.json()

    setLoadingSpinner(false)

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

    console.log(recipe)


    //recipe.preparation = recipe.preparation.replaceAll("\n", "\r\n")

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


                  {loadingSpinner && <div className='loading-spinner-div main-page-loading-spinner'>
                    <svg className='loading-spinner' xmlnssvg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" width="256px" height="32px" viewBox="0 0 128 16" xmlSpace="preserve"><rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" /><path fill="#ffd3d3" d="M10,3.5C7.614-2.053.844-.758,0.8,5.681c-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1,10.01,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.412-2.736,5.387-6.272C19.156-.813,12.268-1.832,10,3.5Zm21.6,0c-2.382-5.548-9.152-4.254-9.2,2.186-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1,31.61,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.411-2.736,5.387-6.272C40.756-.813,33.868-1.832,31.6,3.5Zm21.6,0C50.814-2.053,44.044-.758,44,5.681c-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1,53.21,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.411-2.736,5.387-6.272C62.356-.813,55.468-1.832,53.2,3.5Zm21.6,0c-2.382-5.548-9.152-4.254-9.2,2.186-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1,74.81,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.412-2.736,5.387-6.272C83.956-.813,77.068-1.832,74.8,3.5Zm21.6,0c-2.382-5.548-9.152-4.254-9.2,2.186-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1,96.41,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.412-2.736,5.387-6.272C105.556-.813,98.668-1.832,96.4,3.5Zm21.6,0c-2.382-5.548-9.152-4.254-9.2,2.186-0.025,3.537,3.224,4.859,5.387,6.272A10.393,10.393,0,0,1,118.01,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.412-2.736,5.387-6.272C127.156-.813,120.268-1.832,118,3.5Z" /><g><path fill="#ff5252" d="M-11.6,3.5c-2.382-5.548-9.152-4.254-9.2,2.186-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1-11.59,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.412-2.736,5.387-6.272C-2.444-.813-9.332-1.832-11.6,3.5Z" /><path fill="#ff7d7d" d="M-33.2,3.5c-2.382-5.548-9.152-4.254-9.2,2.186-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1-33.19,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.412-2.736,5.387-6.272C-24.044-.813-30.932-1.832-33.2,3.5Z" /><path fill="#ffa8a8" d="M-54.8,3.5C-57.186-2.053-63.956-.758-64,5.681c-0.025,3.537,3.224,4.859,5.387,6.272A10.389,10.389,0,0,1-54.79,16c0.2-.782,1.863-2.711,3.8-4.084,2.123-1.5,5.411-2.736,5.387-6.272C-45.644-.813-52.532-1.832-54.8,3.5Z" /><animateTransform attributeName="transform" type="translate" values="22 0;43.5 0;65 0;86.5 0;108 0;129.5 0;151 0;172.5 0" calcMode="discrete" dur="1000ms" repeatCount="indefinite" /></g></svg>
                  </div>}

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
