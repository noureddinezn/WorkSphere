













































































































































































































































































































































const Btn1 = document.getElementsByClassName("add_worker_btn")[0];
const form = document.querySelector(".form");

Btn1.addEventListener("click", () => {
  form.classList.toggle("hidden");
  form.reset();
});
const roleSelect = document.getElementById("role");
const autreRoleDiv = document.querySelector(".autreRole");

roleSelect.addEventListener("change", () => {
  if (roleSelect.value === "autres") {
    autreRoleDiv.classList.remove("hidden");
  } else {
    autreRoleDiv.classList.add("hidden");
  }
});
const addExpBtn = document.getElementById("addExpBtn");
const experienceContainer = document.querySelector(".experience_container");

addExpBtn.onclick = function () {
  const box = document.createElement("div");
  box.className = "experience_item";

  box.style.border = "1px solid #ccc";
  box.style.padding = "15px";
  box.style.marginBottom = "10px";
  box.style.borderRadius = "8px";
  box.style.backgroundColor = "#f9f9f9";
  box.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

  box.innerHTML = `
    <h3 style="margin-bottom:10px;">Experience</h3>
    <input type="text" placeholder="Company Name" required style="width:100%; padding:8px; margin-bottom:8px; border-radius:5px; border:1px solid #ccc;">
    <input type="date" required style="width:100%; padding:8px; margin-bottom:8px; border-radius:5px; border:1px solid #ccc;">
    <input type="date" required style="width:100%; padding:8px; margin-bottom:8px; border-radius:5px; border:1px solid #ccc;">
    <button type="button" class="remove_exp_btn" style="background:#ff4d4f; color:white; border:none; padding:6px 10px; border-radius:5px; cursor:pointer;">Remove</button>
  `;

  box.querySelector(".remove_exp_btn").onclick = () => box.remove();
  experienceContainer.appendChild(box);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const experiences = [];
  document.querySelectorAll(".experience_item").forEach((item) => {
    const inputs = item.querySelectorAll("input");
    experiences.push({
      company: inputs[0].value,
      startDate: inputs[1].value,
      endDate: inputs[2].value,
    });
  });
