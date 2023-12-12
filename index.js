async function createHTML() {
      try {
            const data = await fetch('https://wizard-world-api.herokuapp.com/Spells');
            const spells = await data.json();

            const main = document.getElementById('collection');
            const favs = document.getElementById('favorites');
            

            const items = spells.slice(0, 30);
      
            items.forEach(item => {
                  const li = document.createElement('div');
                  li.className = 'item';
                  li.id = item.name;
                  li.innerHTML = `<strong>${item.name}</strong> <br> <br>
                                          ${item.effect} <br> <br>
                                          ${item.incantation} <br>`;
                  main.append(li);
            });

            const allItems = document.querySelectorAll('.item');
            const sortBtn = document.querySelectorAll('.sort');

            function addCollection(id) {
                  main.removeChild(id);
                  favs.append(id);
            }
            
            function remCollection(id) {
                  favs.removeChild(id);
                  main.append(id);
            }

            function sortData(direction) {
                  const collectionCon = document.querySelector('#collection');
                  const favoriteCon = document.querySelector('#favorites');
                  const collectionItems = collectionCon.querySelectorAll('.item');
                  const favoriteItems = favoriteCon.querySelectorAll('.item');
                  const colArr = Array.from(collectionItems);
                  colArr.sort((a, b) => (direction == 'desc') ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id));
                  colArr.forEach((item) => {
                        collectionCon.append(item);
                  });
                  const favArr = Array.from(favoriteItems);
                  favArr.sort((a, b) => (direction == 'desc') ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id));
                  favArr.forEach((item) => {
                        favoriteCon.append(item);
                  });
            }
            
            sortBtn.forEach(elem => {
                  elem.addEventListener('click', function() {
                        sortData(elem.dataset.sortdir);
                  })
            });
            
            allItems.forEach(elem => {
                  elem.addEventListener('click', function () {
                        const newChild = document.getElementById(this.id);
                        this.parentElement.id === 'collection' ? addCollection(newChild) : remCollection(newChild);
                  });
            });
      }
      catch (error) {
            console.error('Error: ', error);
      }
}
    
async function manipulateHTML() {
      await createHTML();
}
    
manipulateHTML();