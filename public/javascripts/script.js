document.addEventListener(
	'DOMContentLoaded',
	() => {
		//const agenda = document.getElementsByClassName('flatpicker');
		//flatpickr("#flatpicker", {});
		console.log('IronGenerator JS imported successfully!');
	},
	false
);

// afficher les infos sur l'utilisateur souhaite être cat sitter dès son inscription
function displayCatSitterInfos() {
	if (document.getElementById('catsitter-yes').checked == true) {
    const catsitterInfos = document.getElementById('catsitter-infos');
    catsitterInfos.classList.remove('hidden');
  }
  if (document.getElementById('catsitter-no').checked == true) {
    const catsitterInfos = document.getElementById('catsitter-infos');
    catsitterInfos.classList.add('hidden');
  }
}
