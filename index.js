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
                  li.id = item.id;
                  li.innerHTML = `<strong>${item.name}</strong> <br> <br>
                                          ${item.effect} <br> <br>
                                          ${item.incantation} <br>`;
                  main.append(li);
            });

            const allItems = document.querySelectorAll('.item');

            function addCollection(id) {
                  main.removeChild(id);
                  favs.append(id);
            }
            
            function remCollection(id) {
                  favs.removeChild(id);
                  main.append(id);
            }
            
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