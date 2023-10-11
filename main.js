// open and close 
let addNewBtn = document.querySelector(".addNew");
let closeFormBtn = document.querySelector(".addNewContact .close");
let formSection = document.querySelector(".form");
let contactForm = document.querySelector(".addNewContact");

addNewBtn.addEventListener('click' ,()=>{
   formSection.classList.add("overlay");
   contactForm.style.display = "block";
});
closeFormBtn.addEventListener('click',()=>{
    formSection.classList.remove("overlay");
    contactForm.style.display = "none";
});

// store data
let savedData = localStorage.getItem("contact");
let concatctList = JSON.parse(savedData || "[]");

// select the input 
let contactFormName = document.getElementById("contact_form_name");
let contactFormPhone = document.getElementById("contact_form_phone");
let contactFormEmail = document.getElementById("contact_form_email");
let contactFormAddress = document.getElementById("contact_form_address");

//get last id
let lastContactId = concatctList.length;

// push a new into the array 
let newContact = () =>{
    concatctList.push({
    contactId : lastContactId +=1,
    cantactName : contactFormName.value,
    contactPhone : contactFormPhone.value,
    contactEmail : contactFormEmail.value,
    contactAddress : contactFormAddress.value
    });
    console.log(concatctList);
}
// create render function to show data in the table  
let contactTableTbody = document.getElementById("tdody");
let renderContacts = () =>{
    let trs = '';
    concatctList.forEach(contact =>{
    trs += `
     <tr data-id=${contact.contactId}>
      <td>${contact.contactId}</td>
      <td>${contact.cantactName}</td>
      <td>${contact.contactPhone}</td> 
      <td>${contact.contactEmail}</td>
      <td>${contact.contactAddress}</td>
      <td class="green">edit</td>
      <td class="red">delete</td>
     </tr>
    `
    });
    contactTableTbody.innerHTML = trs;
}
renderContacts()

// reset value function 
let resetFormContact = () =>{
    contactFormName.value = '';
    contactFormPhone.value = '';
    contactFormEmail.value = '';
    contactFormAddress.value = '';
}
// hundle save btn listerer 
let saveBtn = document.querySelector(".save");

// add new contact handler 
let saveBtnHandler = () =>{
    newContact();
    localStorage.setItem("contact",JSON.stringify(concatctList));
    resetFormContact();
    renderContacts();
    formSection.classList.remove("overlay")
    contactForm.style.display = "none";
}
saveBtn.addEventListener('click' ,saveBtnHandler)

// logic to handle end edit and delete 
contactTableTbody.addEventListener('click' ,e =>{
  if(e.target.classList.contains("green")){
    let tr = e.target.parentElement;
    let id = tr.dataset.id;
    let index = parseInt(id)-1;
    // assign the values from the array to input values 
     contactFormName.value = concatctList[index].contactName;
     contactFormPhone.value = concatctList[index].contactPhone;
     contactFormEmail.value  = concatctList[index].contactEmail; 
     contactFormAddress.value = concatctList[index].contactAddress;
    console.log(concatctList);
      // open the form with overlay 
    formSection.classList.add("overlay");
   contactForm.style.display = "block";
      // update handler
      let updateHandler = () =>{
        
          // new object with modify data 
          let updateContact = {
            contactId : parseInt(id),
            cantactName : contactFormName.value,
            contactPhone : contactFormPhone.value,
            contactEmail : contactFormEmail.value,
            contactAddress : contactFormAddress.value
          }

         // change the old object with new 
          concatctList[index] = updateContact;
          localStorage.setItem("contact",JSON.stringify(concatctList));
         // close the overlay and hide form 
         formSection.classList.remove("overlay");
         contactForm.style.display = "none";
         // reset the form 
          resetFormContact();

          // display render data
          renderContacts();

          // listener handler
        saveBtn.removeEventListener('click' ,updateHandler);
        saveBtn.addEventListener('click' ,saveBtnHandler);
      }
      saveBtn.removeEventListener('click' ,saveBtnHandler);
      saveBtn.addEventListener('click' ,updateHandler);
  }
  if(e.target.classList.contains("red")){
     let tr = e.target.parentElement;
     let id = tr.dataset.id;
     let index = parseInt(id) - 1;
     concatctList.splice(index,1);
     localStorage.setItem("contact",JSON.stringify(concatctList));
     renderContacts();
  }
}); 

// search logic
let searchInput = document.getElementById("search");
let from = searchInput.parentElement;
let trs = document.querySelectorAll('tbody') ;
from.addEventListener('submit' , e=> e.preventDefault());

searchInput.addEventListener('keyup' , ()=>{
    let searchInputValue = searchInput.value.toLowerCase();
    trs.forEach(tr=> {
     trName = tr.children[1].textContent.toLocaleLowerCase();
     if (trName.includes(searchInputValue)){
        tr.style.display = "";
     }
     else{
        tr.style.display = "none"
     }
    })
});