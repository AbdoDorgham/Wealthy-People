// DOM Elements
const btnAddUser = document.getElementById("btnAddUser");
const main = document.getElementById("main");
let persons = [] ;
const btnDoubleMoney = document.getElementById("btnDoubleMoney");
const btnShowMillionaires = document.getElementById("btnShowMillionaires");
const btnSort = document.getElementById("btnSort");
const btnCalculateTotal = document.getElementById("btnCalculateTotal");








// add the random person inside the main section
let addToDom = (person) => {
   
    // create div 
    let element = document.createElement('div');
    element.classList.add('person')
    // add person to div 
    element.innerHTML = `<span>${person.name}</span> <span>$${person.wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>` ;
    // display div inside main section 
    main.appendChild(element);


    // let totalDiv = document.getElementsByClassName('total');
    // if(totalDiv.length > 0){
    //     totalDiv[0].remove();;
    // }

    remveTotalDiv();
    

}

// get random person from external API 
let getRandomUser = async () => {
    // fetch API and make it`s response in Json format 
    let res = await (await fetch('https://randomuser.me/api')).json();

    // get first,last name from results (API)
    const person = {
        name: `${res.results[0].name.first} ${res.results[0].name.last}`,
        wealth: Math.floor(Math.random() * 1000000)

    };
    persons.push(person);
    addToDom(person);
    
};

// to  Refresh Table data
const refreshPersonsTable = () => {
    main.innerHTML = `<h2><strong>Person</strong>&nbsp;Wealth</h2>`;
    persons.forEach(person => addToDom(person));
};

// to double money for every person
let doubleMoney = async () => {  
    
    persons = persons.map(person => {
        return {name:person.name ,wealth: person.wealth*2}
    });
    refreshPersonsTable();
};


// to show millionaires persons 
let showMillionaires = async () => {
    persons = persons.filter(person => person.wealth >= 1000000);
    refreshPersonsTable();


}



// to sort persons by Richest
let sort = async () => {
    persons = persons.sort((person1, person2) => {
        return person2.wealth - person1.wealth
    });
    refreshPersonsTable();
}


// to calculate total wealth for all persons 
let calculateTotal = async () => {
    remveTotalDiv();
    let totalWealth = persons.reduce((total,person) => (total+=person.wealth),0)
    let element = document.createElement('div');
    element.classList.add('total',)
    element.innerHTML = `<span>Total</span> <span>$${totalWealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>` ;
    main.appendChild(element);


    

 }

 // remove The total div
const remveTotalDiv = () => {
   let totalDiv = document.getElementsByClassName('total')[0];
   if (totalDiv != null) {
       totalDiv.remove();
   }
};


// event listeners 
btnAddUser.addEventListener('click', getRandomUser);
btnDoubleMoney.addEventListener('click', doubleMoney);
btnShowMillionaires.addEventListener('click', showMillionaires);
btnSort.addEventListener('click', sort);
btnCalculateTotal.addEventListener('click', calculateTotal);






// get 3 Persons when Page is load 
// for(let i = 0 ; i<3 ; i++){
//     getRandomUser();

// }



// To Double Money for all persons 
// let myDoubleMoney = () => {
//     main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`
//     for(let i = 0 ;i<persons.length ;i++){
//         persons[i].wealth *=2 ;
//         addToDom(persons[i]);
//     }

//  }



// let myShowMillionaires = () => {
//     main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>` 
//     for(let i = 0 ;i< persons.length;i++){

//         if(persons[i].wealth >= 1000000){

//             addToDom(persons[i]);

//         }else{

//             persons.splice(i,1)
//             // decrease i beacause length of array decreased because of Slice()
//             i--
//         }

//     }


// }


// let myCalculateTotal = async () => {
//     let total = {name: "Total" , wealth:0} ;
//     for(let i = 0 ;i<persons.length;i++){
//         total.wealth+= persons[i].wealth ;
//     }
//     addToDom(total);

//  }

// btnDoubleMoney.addEventListener('click', myDoubleMoney);
// btnShowMillionaires.addEventListener('click', myShowMillionaires);
// btnCalculateTotal.addEventListener('click', myCalculateTotal);
