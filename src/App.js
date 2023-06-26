import { useState, useEffect } from 'react';
import './App.css';
import './index'
import NutritionAnalysisComponent from './NutritionAnalysisComponent';
import { LoaderPage } from './LoaderPage';
import Swal from 'sweetalert2';

function App() {

  const MY_ID = "6e54336a";
  const MY_KEY = "9b48a1c4f9ec9dc1e8a7530eb64a84ff";
  const MY_URL = 'https://api.edamam.com/api/nutrition-details'

  const [myEntry, setMyEntry] = useState(''); // what user enters into the input field
  const [analysis, setAnalysis] = useState(); //initial state - no analysis, changed state - got analysis
  const [myNutrition, setMyNutrition] = useState(); // data form API 
  const [stateLoader, setStateLoader] = useState(false) // Loader state


 
  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
      console.log (data)
    } else {
      //setStateLoader(false);
      handleAlert();
    }
  }

  const myRecipeSearch = e => {
    setAnalysis(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setMyEntry(analysis);
  }

  const handleAlert =()=>{
    Swal.fire(
      'Ingredients are entered incorrectly',
      'Follow an example: 1 banana, 1 cup strawberries, 100ml yogurt, teaspoon coconut paste',
      'Try again!'
    )
  }

  useEffect(() => {
    if (myEntry!== '') {
      let ingr = myEntry.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [myEntry])

  return (
    <div>
           {stateLoader && <LoaderPage />}

     <div className="container">
            <h1>Your Nutrition Analysis</h1>
            </div>
<div className="container">
<form onSubmit={finalSearch}>
    <input className='search' placeholder='Enter Your Ingredients, ex: 1 banana, 1 cup strawberries, 100 ml yogurt...' onChange={myRecipeSearch}></input>
    <br></br>     <br></br>
<div className='container'>
  <button type='submit'>Submit</button>
</div>
</form>
</div>

<div className='container'>
<br></br>
          </div>
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <NutritionAnalysisComponent
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      
    </div>
  );
}

export default App;
