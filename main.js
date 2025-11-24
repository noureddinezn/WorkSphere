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



