let inputName = document.querySelector("#fname")
let inputTitle = document.querySelector("#tname")
let inputCountry = document.querySelector("#cname")
let submit = document.querySelector("#submit")
const API_URL = 'https://northwind.vercel.app/api/suppliers';
//post 
const postSupplier = async (supplier) => {
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplier)
    })
}

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const supplier = {
        contactName: inputName.value,
        contactTitle: inputTitle.value,
        address: {
            country: inputCountry.value
        }
    }
    Swal.fire({
        title: 'Əlavə olundu!',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(images.jpg)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("giphy.gif")
          top  center
          no-repeat
        `
      })
    inputName.value = "";
    inputTitle.value = "";
    inputCountry.value = "";

    postSupplier(supplier);
    // window.location.href = "file:///C:/Users/ClassTime/Desktop/newles/index.html";

})
