const BTN_LEFT = document.querySelector('.slider .prew');
const BTN_RIGHT = document.querySelector('.slider .next');
const COROUSEL = document.querySelector('.slider .cardContainer');
const ITEM_CENTER = document.querySelector('.slider .itemCenter');
const ITEM_LEFT = document.querySelector('.slider .itemLeft');
const ITEM_RIGHT = document.querySelector('.slider .itemRight');
const CLOSE_MODAL_BTN = document.querySelector('.modal .closeModal');
const MODAL = document.querySelector('.modal');
const MODAL_OVERLAY = document.getElementById('modalOverlay')

fetch('../../assets/pets.json')
.then((response) => {
  return response.json();
}).then((data) => {
    const PETS = [...data];
    const getCardCount = () => {
        const width = window.innerWidth;
        if (width < 768 ) {
            return 1;
        } else if (width < 1280 ) {
            return 2;
        }
        return 3;
    }
    const openModal = (cardId) => {
        const cardInfo = PETS.find(elem => elem.id === cardId);
        MODAL.querySelector('.modalContent img').src = cardInfo.img;
        MODAL.querySelector('.contentTop .title').textContent = cardInfo.name;
        MODAL.querySelector('.contentTop .subTitle').textContent = `${cardInfo.type} - ${cardInfo.breed}`;
        MODAL.querySelector('p.description').textContent = cardInfo.description;
        MODAL.querySelector('ul li.age span').textContent = cardInfo.age;
        MODAL.querySelector('ul li.inoculations span').textContent = cardInfo.inoculations.join(', ');
        MODAL.querySelector('ul li.parasites span').textContent = cardInfo.parasites.join(', ')
        MODAL.querySelector('ul li.diseases span').textContent = cardInfo.diseases.join(', ')
        MODAL.classList.add('active');
        document.getElementById('modalOverlay').classList.add('active');
        document.body.classList.add('overflowHidden');
    }
    const closeModal = () => {
        MODAL.classList.remove('active');
        document.getElementById('modalOverlay').classList.remove('active');
        document.body.classList.remove('overflowHidden');
    }
    CLOSE_MODAL_BTN.addEventListener('click', closeModal)
    MODAL_OVERLAY.addEventListener('click', closeModal)
    const createTemplateCard = (cardInfo) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = cardInfo.id;
        const img = document.createElement('img');
        img.src = cardInfo.img;
        const title = document.createElement('span');
        title.classList.add('title');
        title.textContent = cardInfo.name;
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = "Lear More";
        card.append(img);
        card.append(title);
        card.append(btn);
        card.addEventListener('click', ()=>{
            openModal(cardInfo.id);
        })
        return card;
    }
    const getNewArray = (ids) =>{
        return PETS.reduce( (acc, item) => {
            if (!ids.includes(item['id'])) acc.push(item);
            return acc;
        } , []);
    }
    const getRandomNumber = () => {
        const numPool = [ 0,1,2,3,4 ];
        function shuffle(numPool) {
            for(var j, x, i = numPool.length; i; j = parseInt(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
            return numPool;
        };
        let randomResult = shuffle(numPool);
        while( randomResult.length > 3 ) {
            randomResult.pop()
        }
        return randomResult;
    }
    const createCardInit = (move) => {
        const cardCount = getCardCount();
        for (let i = 0; i < cardCount; i++){
            const card = createTemplateCard(PETS[i])
            ITEM_CENTER.append(card);
        }
    }
    const createCard = (move) => {
        const cardCount = getCardCount();
        let changedItem;
         if (move === 'leftMove'){
            changedItem = ITEM_LEFT;
        }else{
            changedItem = ITEM_RIGHT;
        }
        let currentIds = [];
        let cards = document.querySelectorAll('.itemCenter .card');
        [...cards].forEach(card => {
            currentIds.push(card.dataset.id)
        })
        const newCards = getNewArray(currentIds);
        const newRandomIndex = getRandomNumber();
        for (let i = 0; i < cardCount; i++){
            const card = createTemplateCard(newCards[newRandomIndex[i]])
            changedItem.append(card);
        }
    }
    createCardInit();
    const moveLeft = function (){
        createCard('leftMove');
        COROUSEL.classList.add('transition-left');
        BTN_LEFT.removeEventListener('click', moveLeft);
        BTN_RIGHT.removeEventListener('click', moveRight);
    }
    const moveRight = function (){
        createCard('rightMove');
        COROUSEL.classList.add('transition-right');
        BTN_LEFT.removeEventListener('click', moveLeft);
        BTN_RIGHT.removeEventListener('click',moveRight);
    }
    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
    COROUSEL.addEventListener('animationend', (animationEvent) => {
        let changeItem;
        if(animationEvent.animationName === 'move-left'){
            COROUSEL.classList.remove('transition-left');
            changeItem = ITEM_LEFT;
        }else {
            COROUSEL.classList.remove('transition-right');
            changeItem = ITEM_RIGHT;
        }
        document.querySelector('.slider .itemCenter').innerHTML = changeItem.innerHTML;
        [ ...document.querySelectorAll('.slider .itemCenter .card')].forEach((item)=>{
            item.addEventListener('click', () => {
                openModal(item.dataset.id)
            })
        })
        changeItem.innerHTML = '';

        BTN_LEFT.addEventListener('click', moveLeft);
        BTN_RIGHT.addEventListener('click', moveRight);
    })
});

