// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const employeeURL = `${baseServerURL}/employees`;
const userRegisterURL = `${baseServerURL}/register`;

// Append div to main section
let mainSection = document.getElementById("data-list-wrapper");

//  add employees
let empNameInput = document.getElementById("employee-name");
let empImgInput = document.getElementById("employee-image");
let empDeptInput = document.getElementById("employee-dept");
let empSalaryInput = document.getElementById("employee-salary");
let empCreateBtn = document.getElementById("add-employee");

//Sorting 
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

//Filter 
let filterLessThan1LBtn = document.getElementById("filter-less-than-1L");
let filterMoreThanEqualLBtn = document.getElementById(
  "filter-more-than-equal-1L"
);

// Update employees
let updateEmpIdInput = document.getElementById("update-employee-id");
let updateEmpNameInput = document.getElementById("update-employee-name");
let updateEmpImageInput = document.getElementById("update-employee-image");
let updateEmpDeptInput = document.getElementById("update-employee-dept");
let updateEmpSalaryInput = document.getElementById("update-employee-salary");
let updateEmpUpdateBtn = document.getElementById("update-employee");

//Update Salary
let updateScoreEmpId = document.getElementById("update-score-employee-id");
let updateScoreEmpSalary = document.getElementById(
  "update-score-employee-salary"
);
let updateScoreEmpSalaryButton = document.getElementById(
  "update-score-employee"
);

//Employee Data
let employeesData = [];



window.addEventListener("load",async()=>{
  
  fetchAndRenderUsers()

})

empCreateBtn.addEventListener("click",function(){
  let empname=empNameInput.value;
  let empimg=empImgInput.value;
  let empdept=empDeptInput.value;
  let empsalary=empSalaryInput.value;
  

  let newempobj={
    name:empname,
    image:empimg,
    department:empdept,
    salary:empsalary,
  }

   fetch(`${baseServerURL}/employees`,{
       method:'POST',
       body:JSON.stringify(newempobj),
       headers:{
        'content-type':'application/json'
       },
   }) 

   .then((res)=> res.json())
   .then((data)=> {fetchAndRenderUsers()})
   .catch((err)=> console.log(err))


})



function fetchAndRenderUsers(){
  fetch(`${baseServerURL}/employees`)
  .then((res)=>res.json())
  .then((data)=>{
    mainSection.innerHTML=null;
    let cardList = getcardlist(data);
    mainSection.append(cardList)
})
}

function getcardlist(data){
 
  let cardList = document.createElement("div");
  cardList.classList.add("card-list")

  data.forEach(item => {
     let card = getCard(
      item.id,
      item.name,
      item.salary,
       `${baseServerURL}/${item.image}`
     ); 


     cardList.append(card);
  });

  return cardList;
}


function getCard(userId,fullName, email,imageUrl){

 let card = document.createElement("div");
 card.classList.add("card");
 card.setAttribute("data-id",userId);

 let cardimg = document.createElement("div");
 cardimg.classList.add("card-img");

 let img = document.createElement("img");
 img.src= imageUrl;
 img.setAttribute("alt","employee");
 cardimg.append(img)


  let cardbody = document.createElement("div");
  cardbody.classList.add("card-body");

let cardtitle = document.createElement("div");
cardtitle.classList.add("card-item");
cardtitle.classList.add("card-title");
cardtitle.innerText=fullName;


let cartdescription = document.createElement("div");
cartdescription.classList.add("card-item");
cartdescription.classList.add("card-description");
cartdescription.classList.add("card-salary");
cartdescription.innerText=email;


let cardedit=document.createElement("a");
cardedit.setAttribute("herf","#")
cardedit.setAttribute("data-id",userId);
cardedit.setAttribute("data-name",fullName);
cardedit.setAttribute("class","card-item card-link")
cardedit.innerText="EDIT";

cardbody.append(cardtitle);
cardbody.append(cartdescription);
cardbody.append(cardedit);

card.append(cardimg)
card.append(cardbody)

return card;
}


