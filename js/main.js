const main  = document.getElementById('main') ;
const addUserBtn  = document.getElementById('add-user') ;
const doubleBtn  = document.getElementById('double') ;
const showMillonairesBtn  = document.getElementById('show-millionaires') ;
const sortBtn  = document.getElementById('sort') ;
const calculateWealthBtn  = document.getElementById('calculate-wealth') ;

let data = [] ;

getRandomUser() ;
getRandomUser() ;
getRandomUser() ;

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json() ;
    // console.log(data);

    const user = data.results[0] ;
    const newUser = {
        name : `${user.name.first} ${user.name.last}` ,
        money: Math.floor(Math.random()*1000000) 

    }

    addData(newUser);
}
// Double Money
function doubleMoney() {
    data = data.map( user => {
        return {...user , money : user.money *2} ;
    } ) ;
    updateDom() ;
}
// Sort users by richest
function sortByRichest () {
    data.sort((a,b) => b.money - a.money ) ;
    updateDom() ;
}
// Filter by Millonaires
function showMillonaires() {
    data = data.filter( user => user.money > 1000000)  ;
    updateDom() ;
}
// Calculate total Wealth
function calculateWealth() {
    const wealth = data.reduce( (acc , user) => (acc+user.money) , 0 ) ;
    
    const wealthEl = document.createElement('div') ;
    wealthEl.innerHTML = `<h3>Total Wealth :<strong>${formatMoney(wealth)}</strong> </h3>` ;
    main.appendChild(wealthEl) ;
}

// Add new obj to data 
function addData(obj){
    data.push(obj) ;
    updateDom() ;
}

// Update Dom
function updateDom(providedData = data) {
    // clear main div ;
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>" ;
    providedData.forEach( item => {
        const element = document.createElement('div') ;
        element.classList.add('person') ;
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}` ;
        main.appendChild(element) ;
    }) ;
}

// Format as Money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  addUserBtn.addEventListener('click' , getRandomUser) ;
  doubleBtn.addEventListener('click' , doubleMoney) ;
  sortBtn.addEventListener('click' , sortByRichest) ;
  showMillonairesBtn.addEventListener('click' , showMillonaires) ;
  calculateWealthBtn.addEventListener('click' , calculateWealth) ;