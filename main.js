 
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

 


function displayUnassigned() {
  unassignedList.innerHTML = "";

  employees
    .filter(e => e.room === null)
    .forEach(e => {
      const div = document.createElement("div");
      div.className = "employee_box";

      div.innerHTML = `
        <img src="${e.image}" class="photo"/>
        
        <span>${e.role}</span>
      `;

      unassignedList.appendChild(div);
    });
}


function canEnterRoom(emp, room) {
  const role = emp.role;

  if (role === "Manager") return true;
  if (role === "Nettoyage" && room === "archives") return false;
  if (role === "Nettoyage") return true;

  const rules = {
    "reception": ["Manager","Nettoyage","Réceptionniste"],
    "serveurs": ["Manager","Nettoyage","Technicien IT"],
    "securite": ["Manager","Nettoyage","Agent de sécurité"],
    "archives": ["Manager"],
    "personnel": ["Manager", "Nettoyage", "Autre"],   
    "conference": ["Manager", "Nettoyage", "Autre"]
  };


  if (!rules[room].length) return true;

  return rules[room].includes(role);
}


function openRoomPopup(roomName) {
  selectedRoom = roomName;

  popupList.innerHTML = "";

  employees
    .filter(e => e.room === null)
    .forEach(e => {
      if (canEnterRoom(e, roomName)) {
        const div = document.createElement("div");
        div.className = "popup_item";

        div.innerHTML = `
          <img src="${e.image}" />
          <p>${e.name}</p>
          <button class="add_btn">Ajouter</button>
        `;

        div.querySelector(".add_btn").onclick = () => assignToRoom(e.id);
        popupList.appendChild(div);
      }
    });

  document.getElementById("roomPopup").classList.remove("hidden");
}

document.getElementById("closeRoomPopup")
  .addEventListener("click", () => {
    document.getElementById("roomPopup").classList.add("hidden");
});



function assignToRoom(id) {
  const emp = employees.find(e => e.id === id);
  emp.room = selectedRoom;

  displayUnassigned();
  displayRooms();
  document.getElementById("roomPopup").classList.add("hidden");
}

function displayRooms() {
  const roomDivs = document.querySelectorAll(".room");

  roomDivs.forEach(div => {
    const roomName = div.dataset.room;
    const list = div.querySelector(".room_list");
    list.innerHTML = "";

    employees
      .filter(e => e.room === roomName)
      .forEach(e => {
        const el = document.createElement("div");
        el.className = "room_emp";

        el.innerHTML = `
          <img src="${e.image}" />
          <p>${e.name}</p>
          <span>${e.role}</span>
          <button class="remove_btn">Remove</button>
        `;

        
        el.querySelector(".remove_btn").addEventListener("click", () => {
    e.room = null;
    displayRooms();
    displayUnassigned();
       });

        
        list.appendChild(el);
      });
  });
}

