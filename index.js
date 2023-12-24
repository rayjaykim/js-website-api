async function createHTML() {
      try {
            const data = await fetch('https://wizard-world-api.herokuapp.com/Spells');
            const spells = await data.json();
            
            const main = document.getElementById('collection');
            const favs = document.getElementById('favorites');
            const colBox = document.querySelector('.colCount');
            const favBox = document.querySelector('.favCount');
            

            const items = spells.slice(0, 30);

            items.forEach(item => {
                  const li = document.createElement('div');
                  const title1 = document.createElement('div');
                  const text1 = document.createElement('div');
                  text1.class = 'checkContent';
                  li.className = `item ${item.type}`;
                  li.id = item.name;
                  title1.innerHTML = `<strong>${item.name}</strong>`;
                  text1.innerHTML = `Effect: ${item.effect} <br> <br
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

                  var colUniqueSpells = [];
                  var colCountArray = [];
                  var colUniqueSpellCount = [];
                  var favUniqueSpells = [];
                  var favCountArray = [];
                  var favUniqueSpellCount = [];

                  collectionItems.forEach(element => {
                        if (!colUniqueSpells.includes(element.className.slice(5))) {
                              colUniqueSpells.push(element.className.slice(5));
                              colUniqueSpellCount.push(0);
                        }
                        colCountArray.push(element.className.slice(5));
                  });
                  
                  colUniqueSpells.sort();
                  colCountArray.forEach(element => {
                        if (colUniqueSpells.includes(element)) {
                              colUniqueSpellCount[colUniqueSpells.indexOf(element)] += 1;
                        }
                  })

                  colBox.innerHTML = "<h3>Spell Type Count</h3>"
                  for (i = 0; i < colUniqueSpellCount.length; i++) {
                        const type = document.createElement('div');
                        type.innerHTML = `${colUniqueSpells[i]}: ${colUniqueSpellCount[i]}`;
                        colBox.append(type);
                  }

                  favoriteItems.forEach(element => {
                        if (!favUniqueSpells.includes(element.className.slice(5))) {
                              favUniqueSpells.push(element.className.slice(5));
                              favUniqueSpellCount.push(0);
                        }
                        favCountArray.push(element.className.slice(5));
                  });

                  favUniqueSpells.sort();
                  favCountArray.forEach(element => {
                        if (favUniqueSpells.includes(element)) {
                              favUniqueSpellCount[favUniqueSpells.indexOf(element)] += 1;
                        }
                  })

                  favBox.innerHTML = "<h3>Spell Type Count</h3>"
                  for (i = 0; i < favUniqueSpellCount.length; i++) {
                        const type = document.createElement('div');
                        type.innerHTML = `${favUniqueSpells[i]}: ${favUniqueSpellCount[i]}`;
                        favBox.append(type);
                  }
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
                        chantCount();
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
