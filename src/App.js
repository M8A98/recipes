import React,{useEffect,useState} from 'react'
import Recipe from './Recipe'
import './App.css';


const App = ()=>{

  const APP_ID = 'f842e68d'
  const APP_KEY = '83244ed037f18f6cc8a5a4c21cb118d2'
  //const [counter,setCounter] = useState(0)
  const [recipes,setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query,setQuery] = useState('chicken')
  useEffect(()=>{
    getRecipes()
  },[query])

  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }

  //fetch().then(response =>{response.json})

  const updateSearch = e =>{
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e =>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  return(
    <div className="App">
      <form onSubmit ={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button className="search-button">Search</button>
      </form>
  {/* <h1 onClick={()=>setCounter(counter+1)}>{counter}</h1> */}
  <div className="recipes">
  {recipes.map(recipe=>(
     <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}
     ingredients = {recipe.recipe.ingredients}/>
  ))}
  </div>
    </div>
  )
}

export default App;