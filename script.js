// ================= ELEMENTS =================
const select = document.querySelector(".custom-select");
const selected = select.querySelector(".selected");
const options = select.querySelectorAll(".options div");
const lida = document.querySelector("#lida");
const add_icon = document.querySelector("#add-icon");
const modal = document.querySelector(".modal");
const cancel = document.querySelector("#cancel");
const apply = document.querySelector("#apply");
const listactv = document.querySelector(".list-actv");
const inputactv = document.querySelector("#inputactv");
const body = document.querySelector("body");
const h1 = document.querySelector("#h1");
// ================= LOCAL STORAGE =================
let actvstorage = JSON.parse(localStorage.getItem("actvlist")) || [];

// ================= DISPLAY ACTIVITIES =================
function displayactv() {
  listactv.innerHTML = "";

  actvstorage.forEach((actv, index) => {
    const actvDiv = document.createElement("div");
    actvDiv.className = "actv";

    const left = document.createElement("div");
    left.className = "note-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = actv.done;

    checkbox.onchange = () => {
      actvstorage[index].done = checkbox.checked;
      
      localStorage.setItem("actvlist", JSON.stringify(actvstorage));
    };

    const label = document.createElement("label");
    label.textContent = actv.text;

    left.append(checkbox, label);

    const right = document.createElement("div");

    // Edit button (placeholder)
    const editBtn = document.createElement("button");
    editBtn.className = "btnactv";

    const editImg = document.createElement("img");
    editImg.src = "edit.png";
    editImg.className = "imgactv";

    editBtn.appendChild(editImg);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btnactv";

    const deleteImg = document.createElement("img");
    deleteImg.src = "delete.png";
    deleteImg.className = "imgactv";

    deleteBtn.appendChild(deleteImg);

    deleteBtn.onclick = () => {
      actvstorage.splice(index, 1);
      localStorage.setItem("actvlist", JSON.stringify(actvstorage));
      displayactv();
    };

    right.append(editBtn, deleteBtn);

    actvDiv.append(left, right);
    listactv.appendChild(actvDiv);
  });
}

// ================= DROPDOWN =================
selected.onclick = () => {
  select.classList.toggle("open");
};

options.forEach(option => {
  option.onclick = () => {
    selected.innerHTML =
      option.textContent.toUpperCase() +
      '<span><img class="dropd" src="dropdown.png"></span>';
    select.classList.remove("open");
  };
});

// ================= MODAL =================
add_icon.onclick = () => {
  modal.style.display = "block";
  inputactv.focus();
};

cancel.onclick = () => {
  modal.style.display = "none";
  inputactv.value = "";
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
    inputactv.value = "";
  }
});

// ================= ADD ACTIVITY =================
apply.onclick = () => {
  const text = inputactv.value.trim();
  if (!text) return;

  actvstorage.push({
    text: text,
    done: false
  });

  localStorage.setItem("actvlist", JSON.stringify(actvstorage));

  displayactv();

  inputactv.value = "";
  modal.style.display = "none";
};
const labels = document.querySelectorAll("label");



// Load saved theme
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  lida.src = "half-moon.png";
}

// Toggle theme
lida.onclick = () => {
  body.classList.toggle("light");

  const isLight = body.classList.contains("light");
  lida.src = isLight ? "half-moon.png" : "sun.png";

  localStorage.setItem("theme", isLight ? "light" : "dark");
};


 
// ================= INIT =================
displayactv();
