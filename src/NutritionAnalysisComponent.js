const NutritionAnalysisComponent =({ label, quantity, unit })=>{

    return(
        <div className="container">
            <div className="analysisBox">

<p ><b>{label}</b> - {quantity.toFixed()} {unit}</p>
</div>
        </div>
    )
}

export default NutritionAnalysisComponent;