const gallery = document.getElementById('gallery');
const searchContainer = document.getElementsByClassName('search-container')[0];

//Calling to fetch tp collect data from the api
fetch('https://randomuser.me/api/?results=12')
  .then(res => res.json()) //Fetches data and converts into JSON format
  .then(generateHTML)
  .then(generateSearch)
  .catch(err => console.log(err))

//creating html for every object in the array
function generateHTML(data) {
  data.results.map( (person,index, arrayObj) => {
      const card = document.createElement('div');
      gallery.appendChild(card);
      card.classList = 'card';
      card.innerHTML = `
      <div class="card-img-container">
      <img class="card-img" src= "${person.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
      <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
      <p class="card-text">${person.email}</p>
      <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
      </div> `

    card.addEventListener('click', ()=>
    {
      generateModalContainer(person, index, arrayObj);
    })

    });
    
  }

  //creating html for every individaual person by clicking on them
  function generateModalContainer(person,index, arrayObj)
  {
    const modalContainer = document.createElement('div');
      modalContainer.classList = 'modal-container';
      gallery.appendChild(modalContainer);
      modalContainer.innerHTML = `
      <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${person.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p>
          <hr>
          <p class="modal-text">${person.cell}</p>
          <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, OR ${person.location.postcode}</p>
          <p class="modal-text">Birthday: ${person.dob.date.substring(0,10)}</p>
      </div>`
      const modalButtonContainer =`
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>`;
  modalContainer.innerHTML += modalButtonContainer;

  navigationButtons(index, arrayObj, modalContainer)
  }
  
  //function to navigate between the people returned from the api results
  function navigationButtons(index, arrayObj, modalContainer){
  const modalButton = document.getElementById('modal-close-btn');
  modalButton.addEventListener('click', ()=>
  {
    modalContainer.remove();
  })
  
  //nextButton removes current modalContainer and uses the index and padd into the object to display next person
  const nextButton = document.getElementById('modal-next');
  nextButton.addEventListener('click', (e) =>
  {
    modalContainer.remove();
    index++;
    if (index < arrayObj.length-1)
    {
      generateModalContainer(arrayObj[index], index, arrayObj);
    }else{
      index=0;
      generateModalContainer(arrayObj[index], index, arrayObj);
    }
  });

  const prevButton = document.getElementById('modal-prev');
  prevButton.addEventListener('click', ()=>
  {
    modalContainer.remove();
    if (index === 0){
      index = arrayObj.length - 1;
      generateModalContainer(arrayObj[index], index, arrayObj);
    }else{
      index--;
      generateModalContainer(arrayObj[index], index, arrayObj);
    }
  })

  }

  //generates search bar 
  function generateSearch()
  {
    searchContainer.innerHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

  search();
  }
  //function to search for the people in the list
  function search()
  {
    let card = gallery.getElementsByClassName('card');
    let cardArray = Array.from(card);
    const searchInput = document.getElementById('search-input');
    const serachButton = document.getElementById('search-submit');
    serachButton.addEventListener('click', ()=>
    {

    for (let i=0; i < cardArray.length; i++)
    {
      let name = document.getElementsByClassName('card-name');
      if (name[i].textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) >-1)
      {
        cardArray[i].style.display = '';
      }else{
        cardArray[i].style.display = 'none';
      }
    }
    })
    
  }
  

    


  





