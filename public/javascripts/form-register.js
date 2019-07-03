const catsitterInfos = document.getElementById('catsitter-infos');
const hostsFields = catsitterInfos.querySelectorAll("input");
const iconFile = document.getElementById("toggle_file_picker");
const avatarPicker = document.getElementById("avatar");


function resetFormHostValues() {
  hostsFields.forEach(field => {
    if (field.type === "radio") field.checked = false;
    else if (field.type === "number") field.value = "1";
    if (field.type === "radio") field.checked = false;
  });
}

// afficher les infos sur l'utilisateur souhaite être cat sitter dès son inscription
function displayCatSitterInfos(evt) {
	if (evt.target.value === "yes") catsitterInfos.classList.remove('hidden');
	else {
    resetFormHostValues();
    catsitterInfos.classList.add('hidden');
  }
}

iconFile.onclick = () => avatarPicker.click();
document.querySelectorAll('[name=catsitter]').forEach((input) => input.oninput = displayCatSitterInfos);
