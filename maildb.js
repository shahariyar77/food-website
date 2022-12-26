document.getElementById('error-massage').style.display='none'

const searchFood =()=>{
// console.log('click btn')
const searchField= document.getElementById('search-field')
const searchText=searchField.value
// console.log(searchText)
searchField.value=''
document.getElementById('error-massage').style.display='none'
if(searchText==''){
  document.getElementById('error-massage').style.display='block'
}else{
  const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(data => desplaySearchResult(data?.meals))
}
}
const desplaySearchResult=(meals)=>{
const serchResult= document.getElementById('search-result')
serchResult.textContent = '';
document.getElementById('error-massage').style.display='none'
if(meals.length== -1){
  document.getElementById('error-massage').style.display='block'
}else{
  meals.forEach(meal =>{
    const div=document.createElement('div')
    div.classList.add('col')
    div.innerHTML=`
    <div onclick=(loadMealDetails(${meal.idMeal})) class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
    </div>
  </div>
    `
    serchResult.appendChild(div)
})
}
}
const loadMealDetails= (mealID) =>{
const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
fetch(url)
.then(res => res.json())
.then(data => displayMealDetails(data?.meals[0]))
}
const displayMealDetails =(meal)=>{
//   const mealDetails = document.getElementById('meal-details')
//   mealDetails.textContent=''
// const div = document.createElement('div')
// div.classList.add('card')
//     div.innerHTML=`
//     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${meal.strMeal}</h5>
//       <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
//     </div>
//   </div>
//   <a href="${meal.stryoutube}" class="btn btn-success">go youtube</a>
//     `
//   mealDetails.appendChild(div)
const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                </div>
                <a href="${meal.strYoutube}" class="btn btn-success">Go Youtube</a>
            </div>`

    mealDetails.appendChild(div)
}