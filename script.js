const API_URL = 'https://northwind.vercel.app/api/suppliers';
(async function getData() {
        const tableBody = document.querySelector(".tableBody");

    
        try{
            const res = await fetch(API_URL)
            const data = await res.json()
    
            data.forEach(elem => {
                let newRow = createRow(elem);
                tableBody.appendChild(newRow);
            });
        
        }catch(err){
            console.log(err)
        }
    })();



function createRow(elem) {
    let row = document.createElement("tr")

    let id = document.createElement("td")
    id.innerText = elem.id;

    let name = document.createElement("td")
    name.innerText = elem?.contactName;

    let title = document.createElement("td")
    title.innerText = elem?.contactTitle;

    let country = document.createElement("td")
    country.innerText = elem?.address?.country;
    
    let btnTd = document.createElement("td")
    let btn = document.createElement("a");
    btn.setAttribute("role","button");
    btn.setAttribute("href","edit.html");
    let btnRight = document.createElement("button")

    btn.classList.add("btn-primary")
    btn.style.backgroundColor="rgb(158, 158, 87)"
    btn.style.borderRadius="5px"
    btn.style.marginRight="10px"
    btn.style.color="white"
    btn.style.width="30px"
    btn.style.height="30px"
    btn.style.padding="7px"
    
    let btnIcon = document.createElement("i");
    btn.classList.add("fa-solid");
    btn.classList.add("fa-pencil");
    btn.append(btnIcon)
    btnRight.classList.add("btn-secondary")
    btnRight.style.backgroundColor="rgb(228, 81, 81)"
    btnRight.style.borderRadius="5px"
    btnRight.style.marginRight="10px"
    btnRight.style.width="30px"
    btnRight.style.height="30px"
    
    let btnRightIcon = document.createElement("i");


    btnRightIcon.classList.add("fa-trash-can");
    btnRightIcon.classList.add("fa-solid");
  
    btnRight.append(btnRightIcon);

    const deleteCategoryByID = async (id)=>{
        await fetch(`${API_URL}/${id}`,{
            method: "DELETE",
        })
    };
    btnRight.addEventListener("click",(e)=>{
        if(!confirm("Are you sure you want to delete?")) return;
        deleteCategoryByID(elem.id);
        e.target.parentElement.parentElement.remove();
    })
        
    
    btnTd.append(btn,btnRight)

    row.append(id,name, title, country, btnTd)

    return row;



}