import { useState, useEffect } from 'react';
import './App.css';
import NutritionAnalysisComponent from './NutritionAnalysisComponent';

function App() {

  const MY_ID = "6e54336a";
  const MY_KEY = "9b48a1c4f9ec9dc1e8a7530eb64a84ff";
  const MY_URL = 'https://api.edamam.com/api/nutrition-details'

  const [myEntry, setMyEntry] = useState('');
  const [analysis, setAnalysis] = useState();
  const [myNutrition, setMyNutrition] = useState();


 
  const fetchData = async (ingr) => {
    //setStateLoader(true);

    const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      //setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      //setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const myRecipeSearch = e => {
    setAnalysis(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setMyEntry(analysis);
  }

  useEffect(() => {
    if (myEntry!== '') {
      let ingr = myEntry.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [myEntry])

  return (
    <div>
     
     <div className="container">
            <h1>Your Nutrition Analysis</h1>
            </div>
<div className="container">
<form onSubmit={finalSearch}>
    <input className='search' placeholder='Your Recipe' onChange={myRecipeSearch}></input>
    <br></br>     <br></br>
<div className='container'>
  <button type='submit'>Submit</button>
</div>
</form>
</div>

{
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
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
