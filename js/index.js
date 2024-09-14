let productName=document.getElementById('productname')
let productPrice=document.getElementById('productprice')
let productDesc=document.getElementById('productdesc')
let productCategory=document.getElementById('categories')
let productimage=document.getElementById('image')
let searchProduct=document.getElementById('search')
let btnUpdata=document.getElementById('updata')
let btnSubmit=document.getElementById('submit')

let products=[]

if (localStorage.getItem('product') != null) {
    products=JSON.parse(localStorage.getItem('product'))
    displayproduct(products)
}

function addproduct() {

// let pathImage=productimage.value.split('\\').splice(2,1)
// let pathImage=productimage.files[0].name

    

    let product={ 
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
        image:`products/${productimage.files[0]?.name}`

    }
    
    products.push(product)
    displayproduct(products)
    localStorage.setItem('product',JSON.stringify(products))

    
}

btnSubmit.addEventListener('click',()=>{
    addproduct()
    clearForm()
    console.log(products);
})


function clearForm() {
    productName.value=''
    productCategory.value=''
    productDesc.value=''
    productPrice.value=''
    productimage.value=''
}

function displayproduct(arr) {
    let cartona=''
for (let i = 0; i < arr.length; i++) {
    cartona+=`
     <div class="col-md-3 col-sm-6 text-center">
      <img src=${arr[i].image} alt="img" class="w-100">
      <h2>${arr[i].name}</h2>
      <div class='d-flex justify-content-around align-content-center'>
      <h5 class='h6 lead'>category: ${arr[i].category}</h5>
      <p>price: ${arr[i].price}</p>
      </div>
      <p>${arr[i].desc}</p>
      <button class="btn btn-outline-success" onclick="updataProduct(${i})">edit</button>
   <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button>
    </div>

    `
}
    document.getElementById('rowData').innerHTML=cartona
}

function deleteProduct(num) {
    products.splice(num,1)
    localStorage.setItem('product',JSON.stringify(products))
    displayproduct(products)
}


searchProduct.addEventListener('input',()=>{
    let resultSearch=[]
   for (let i = 0; i < products.length; i++) {
   if (products[i].name.toLowerCase().includes(searchProduct.value.toLowerCase()) == true) {
    resultSearch.push(products[i])
    
   } 

    
   }

    displayproduct(resultSearch)
})


let numberUpdata;
function updataProduct(i) {
    numberUpdata=i;
    updata.classList.remove('d-none')
    submit.classList.add('d-none')
    let {name ,price , category ,desc ,image} =products[i]
    productName.value=name
    productCategory.value=category
    productDesc.value=desc
    productPrice.value=price
    productimage.value=image

}
btnUpdata.addEventListener('click',function () {
    updata.classList.add('d-none')
    submit.classList.remove('d-none')
    products[numberUpdata].name=productName.value
    products[numberUpdata].price=productPrice.value
    products[numberUpdata].category=productCategory.value
    products[numberUpdata].desc=productDesc.value
    products[numberUpdata].image=`products/${productimage.files[0]?.name}`
    displayproduct(products)
       localStorage.setItem('product',JSON.stringify(products))
   clearForm()

})

//regular
function validateForm(element) {

    let reg={
        productname:/^[A-Z][a-z]{3}$/,
        productprice:/^([0-9]|[0-9][0-9]|100|1[0-9][0-9]|200)$/,
        productdesc:/.{10}/,
        categories:/^(mobile|laptoop)$/,
    }
    

    if (reg[element.id].test(element.value) == true) {
        console.log('عدي');
        element.classList.replace('is-invalid','is-valid')
        
    } else {
        console.log('اقف يلااا');
        element.classList.add('is-valid','is-invalid')
        
    }
    
}