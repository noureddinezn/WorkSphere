const employees = [];
let selectedRoom = null;
const openForm = document.getElementById("openForm");
const closeForm = document.getElementById("closeForm");
const popup = document.getElementById("popup");
const form = document.getElementById("employeeForm");
const unassignedList = document.getElementById("unassigned_list");
const popupList = document.getElementById("popup_employees");


openForm.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

closeForm.addEventListener("click", () => {
  popup.classList.add("hidden");
  document.getElementById("experienceList").innerHTML = "";
  experiences = [];
});



document.getElementById("addExperienceBtn").addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "popup_item";

  div.innerHTML = `
    <input type="text" placeholder="Titre" class="exp_title" required />
    <input type="date" class="exp_start" required />
    <input type="date" class="exp_end" required />
    <button class="remove_btn removeExp">X</button>
  `;
  div.querySelector(".removeExp").addEventListener("click", () => {
    div.remove();
  });

  document.getElementById("experienceList").appendChild(div);
});
form.onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;     
  const phone = document.getElementById("phone").value;     
  const photoUrl = document.getElementById("photoUrl").value; 

  const expBlocks = document.querySelectorAll("#experienceList .popup_item");
  const expArr = [];

  expBlocks.forEach(ex => {
    expArr.push({
      title: ex.querySelector(".exp_title").value,
      start: ex.querySelector(".exp_start").value,
      end: ex.querySelector(".exp_end").value
    });
  });
  
  const employee = {
    id: Date.now(),
    name,
    role,
    email,
    phone,
    image: photoUrl,   
    experiences: expArr,
    room: null
  };

  employees.push(employee);
  displayUnassigned();
  popup.classList.add("hidden");
  form.reset();
  document.getElementById("experienceList").innerHTML = "";
};

 



