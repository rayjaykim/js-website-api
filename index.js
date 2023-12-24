async function createHTML() {
      try {
            const data = await fetch('https://wizard-world-api.herokuapp.com/Spells');
            const spells = await data.json();
            
            const main = document.getElementById('collection');
            const favs = document.getElementById('favorites');
            
            

            const items = spells.slice(0, 30);

            items.forEach(item => {
                  const li = document.createElement('div');
                  const title1 = document.createElement('div');
                  const text1 = document.createElement('div');
                  text1.class = 'checkContent';
                  li.className = `item ${item.type}`;
                  li.id = item.name;
                  title1.innerHTML = `<strong>${item.name}</strong> <br> <br>`;
                  text1.innerHTML = `Effect: <br> ${item.effect} <br> <br>
                                    Incantation: <br> ${item.incantation} <br> <br>
                                    Type: ${item.type}`;
                  li.append(title1, text1);

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
            
            function chantCount() {
                  const collectionCon = document.querySelector('#collection');
                  const favoriteCon = document.querySelector('#favorites');
                  const collectionItems = collectionCon.querySelectorAll('.item');
                  const favoriteItems = favoriteCon.querySelectorAll('.item');

                  var uniqueSpells = [];
                  var countArray = [];
                  var uniqueSpellCount = [];
                  collectionItems.forEach(element => {
                        if (!uniqueSpells.includes(element.className.slice(5))) {
                              uniqueSpells.push(element.className.slice(5));
                        }
                        countArray.push(element.className.slice(5));
                  });

                  uniqueSpellCount.length = uniqueSpells.length;
                  for (i = 0; i < uniqueSpellCount.length; i++) {
                        uniqueSpellCount[i] = 0;
                  }

                  countArray.forEach(element => {
                        if (uniqueSpells.includes(element)) {
                              uniqueSpellCount[uniqueSpells.indexOf(element)] += 1;
                        }
                  })

                  for (i = 0; i < uniqueSpellCount.length; i++) {
                        const type = document.createElement('div');
                        type.innerHTML = `${uniqueSpells[i]}: ${uniqueSpellCount[i]}`
                  }

                  console.log(uniqueSpells, uniqueSpellCount);
            }
            chantCount();

            sortBtn.forEach(elem => {
                  elem.addEventListener('click', function() {
                        sortData(elem.dataset.sortdir);
                  })
            });
            
            allItems.forEach(elem => {
                  elem.addEventListener('click', function () {
                        const newChild = document.getElementById(this.id);
                        this.parentElement.id === 'collection' ? addCollection(newChild) : remCollection(newChild);
                        // chantCount();
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
