const findHostButton = document.getElementById('find-hosts-button');
const meta = document.getElementById('siteurl');
const url = meta.getAttribute('data-url')
const zipcode = document.getElementById('zipcode')
const hostContainer = document.getElementById('host-container')

function createHost(arr) {
  // vider Hosts
  while(hostContainer.firstChild) {
    hostContainer.removeChild(hostContainer.firstChild);
  }
// créer Hosts 
  arr.forEach(element => {
    hostContainer.insertAdjacentHTML("beforeend",`
    <div class="user-card">
    <div class="user-card-avatar">
      <img src="${element.user_id.avatar}" alt="user icon">
    </div>
    <div class="user-card-text">
      <div class="user-card-text-align">
        <p id="user-card-name">${element.user_id.name}</p>
        <p class="city">${element.city}</p>
      </div>
      <p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></p>
      <button class="button-view-profile">
        <a href="/profile/${element._id} target="_blank"">View profile</a>
      </button>
    </div>
  </div>`)
  });
}


if (findHostButton) {
  console.log('hello')
  findHostButton.onclick = (evt) => {
    evt.preventDefault();
    axios.get(`${url}/hosts/api`)
    .then(hostList => {
      console.log(hostList)
      const userInput = zipcode.value;
      const result = hostList.data.filter(oneHost => {
        return oneHost.zipcode === userInput
      })
      console.log(result)
      createHost(result);
    })
    .catch(err => {
      console.log(err)
    })
  } 
}