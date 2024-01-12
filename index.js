const url = 'https://wizard-world-api.herokuapp.com/Spells';
const main = document.getElementById('collection');
const favs = document.getElementById('favorites');
const colBox = document.querySelector('.colCount');
const favBox = document.querySelector('.favCount');
const sortBtn = document.querySelectorAll('.sort');



const getData = async (url) => {
      const data = await fetch(url)
            .then((res) => res.json())
            .then((res) => res.slice(0,30))
            .catch((err) => console.log('Error: ', err));
      return data;
}

const createUI = async (url) => {
      const data = await getData(url)
      createAllCards(data);
      chantCount();
      setListenersToSort(sortBtn);
      setCardListeners();
}

function moveCollection(id, type) {
      const container = type === 'add'
        ? [main, favs]
        : [favs, main]
      container[0].removeChild(id);
      container[1].append(id);
}

function sortData(direction) {
      const collectionCon = document.querySelector('#collection');
      const favoriteCon = document.querySelector('#favorites');
      const collectionItems = collectionCon.querySelectorAll('.item');
      const favoriteItems = favoriteCon.querySelectorAll('.item');

      const colArr = Array.from(collectionItems);
      const favArr = Array.from(favoriteItems);

      [colArr, favArr].forEach((arr) => {
            const container = arr === colArr ? collectionCon : favoriteCon;
            arr.sort((a,b) => {
                  return direction === 'desc' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
            })
            arr.forEach((item) => {
                  container.append(item);
            });
      })
}

const setListenersToSort = (btnsArr) => {
      btnsArr.forEach(elem => {
            elem.addEventListener('click', function() {
                  sortData(elem.id);
            });
      });
}

const setCardListeners = () => {
      const allItems = document.querySelectorAll('.item');
      allItems.forEach(elem => {
            elem.addEventListener('click', function () {
                  const newChild = document.getElementById(this.id);
                  this.parentElement.id === 'collection'
                    ? moveCollection(newChild, 'add')
                    : moveCollection(newChild, 'rem');
                  chantCount();
            });
      });
}


function chantCount() {
      const collectionCon = document.querySelector('#collection');
      const favoriteCon = document.querySelector('#favorites');
      const collectionItems = collectionCon.querySelectorAll('.item');
      const favoriteItems = favoriteCon.querySelectorAll('.item');

      var [
            colUniqueSpells,
            colCountArray,
            colUniqueSpellCount,
            favUniqueSpells,
            favCountArray,
            favUniqueSpellCount
      ] = [[], [], [], [], [], []];
      
      const colArr = Array.from(collectionItems);
      const favArr = Array.from(favoriteItems);

      [colArr, favArr].forEach((arr) => {
            const uniqueSpells = arr === colArr ? colUniqueSpells : favUniqueSpells;
            const uniqueSpellCount = arr === colArr ? colUniqueSpellCount : favUniqueSpellCount;
            const countArray = arr === colArr ? colCountArray : favCountArray;
            const box = arr === colArr ? colBox : favBox;

            arr.forEach(element => {
                  if (!uniqueSpells.includes(element.className.slice(5))) {
                        uniqueSpells.push(element.className.slice(5));
                        uniqueSpellCount.push(0);
                  }
                  countArray.push(element.className.slice(5));
            })

            uniqueSpells.sort();
            
            countArray.forEach(element => {
                  if (uniqueSpells.includes(element)) {
                        uniqueSpellCount[uniqueSpells.indexOf(element)] += 1;
                  }
            })
      
            box.innerHTML = "<h3>Spell Type Count</h3>"
            for (i = 0; i < uniqueSpellCount.length; i++) {
                  const type = document.createElement('div');
                  type.innerHTML = `${uniqueSpells[i]}: ${uniqueSpellCount[i]}`;
                  box.append(type);
            }
      })
}

const createAllCards = (data) => {
      data.forEach(item => {
            const li = document.createElement('div');
            const title1 = document.createElement('div');
            const text1 = document.createElement('div');
            text1.className = 'checkContent';
            li.className = `item ${item.type}`;
            li.id = item.name;
            title1.innerHTML = `<strong>${item.name}</strong>`;
            text1.innerHTML = `Effect: ${item.effect} <br> <br
                              Incantation: <br> ${item.incantation} <br> <br>
                              Type: ${item.type}`;
            li.append(title1, text1);

            main.append(li);
      });
}

createUI(url);
