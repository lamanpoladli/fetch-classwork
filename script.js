const API_URL = 'https://restcountries.com/v3.1/all';
const search = document.querySelector("#search");
(async function getData() {
    const row = document.querySelector(".row");
    const select = document.querySelector("select");

    try{
        const res = await fetch(API_URL)
        const data = await res.json()

        data.forEach(element => {
            let newCard = createCard(element);
            row.append(newCard);
        });
    
        select.addEventListener("change", function () {
            row.innerHTML = "";
    
            if (this.value == "id") {
                data.sort((a, b) => a.population - b.population)
                data.forEach(elem => {
                    row.append(createCard(elem))
                })
            } else if (this.value == "username") {
                data.sort((a, b) => a.name.common.localeCompare(b.name.common))
                data.forEach(elem => {
                    row.append(createCard(elem))
                })
            } else {
                row.innerHTML = "adam ol"
            }
        })
        search.addEventListener("keyup",(e)=>{
                row.innerHTML = "";
                let filteredData = data.filter((user)=>user.name.common.trim().toLowerCase().includes(e.target.value.trim().toLowerCase()))
                filteredData.forEach((user)=>{
                    let newCard = createCard(user);
                    row.append(newCard);
                })
            })
        


    }catch(err){
        console.log(err)
    }

    

})();

// fetch(API_URL)
//     .then(res => res.json())
//     .then(data =>{
//         console.log(data)
//         data.forEach(element => {
//             let newCard = createCard(element);
//             row.append(newCard);
//         });

//         select.addEventListener("change", function(){
//             row.innerHTML = "";

//             if(this.value == "id"){
//                 data.sort((a, b) => a.id - b.id)
//                 data.forEach(elem => {
//                     row.append(createCard(elem))
//                 })
//             }else if(this.value == "username"){
//                 data.sort((a, b)=> a.username.localeCompare(b.username))
//                 data.forEach(elem => {
//                     row.append(createCard(elem))
//                 })
//             }else{
//                 row.innerHTML = "adam ol"
//             }


//         })
//     })





function createCard(user) {
    let col = document.createElement("div");
    col.classList.add("col-3");
    col.classList.add("mb-3");

    let card = document.createElement("div");
    card.classList.add("card");

    let image = document.createElement("img");
    image.setAttribute("src", user.flags.png);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = user.name.common;

    let companyName = document.createElement("p");
    companyName.classList.add("card-list");
    companyName.innerText = user.region;

    let email = document.createElement("a");
    email.setAttribute("href", `${user.maps.googleMaps}`);
    email.innerText = "map";

    cardBody.append(title, companyName,email);
    card.append(image, cardBody);
    col.append(card);

    return col;


}
