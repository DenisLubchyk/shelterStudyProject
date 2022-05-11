const BTN_FIRST_PAGE = document.querySelector('.paginBtn.prewFirst');
const BTN_LAST_PAGE = document.querySelector('.paginBtn.nextLast');
const NEXT_BTN = document.querySelector('.paginBtn.nextOne');
const PREW_BTN = document.querySelector('.paginBtn.prewOne');
const PETS_CONTAINER = document.querySelector('.petsContent .cardContainer');
const PAGE_NUM = document.querySelector('.paginBtn.num')
const PAGE_LENGTH = 6 ;
let currentPage = 1;
const CLOSE_MODAL_BTN = document.querySelector('.modal .closeModal');
const MODAL = document.querySelector('.modal');
const MODAL_OVERLAY = document.getElementById('modalOverlay');

fetch('../../assets/pets.json').then((response) => {
    return response.json();
}).then((data) => {
    const PETS = [...data];

    const getCardCount = () => {
        const width = window.innerWidth;
        if (width < 768 ) {
            return 3;
        } else if (width < 1280 ) {
            return 6;
        }
        return 8;
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
    CLOSE_MODAL_BTN.addEventListener('click', closeModal);
    MODAL_OVERLAY.addEventListener('click', closeModal);
    const getRandomNumber = (count) => {
        const numPool = [ 0,1,2,3,4,5,6,7 ];
        function shuffle(numPool) {
            for(var j, x, i = numPool.length; i; j = parseInt(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
            return numPool;
        };
        let randomResult = shuffle(numPool);
        while( randomResult.length > count ) {
            randomResult.pop()
        }
        return randomResult;
    }
    const getPageCardArr = (count) =>{
        const randomIndexArr = getRandomNumber(count);
        let pageCardArr = [];
        randomIndexArr.forEach((index)=>{
            pageCardArr.push(PETS[index]);
        })
        return pageCardArr;
    }
    const getCardArr = () =>{
        const cardCount = getCardCount();
        let cardArr = [];
        for (let i=0; i < 6; i++){
            const pageCardArr = getPageCardArr (cardCount);
            cardArr.push(pageCardArr);
        }
        return cardArr;
    }
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
    const checkBtnStatus = () => {
        [ ...document.querySelectorAll('.diasbleBtn')].forEach((btn)=>{
            btn.classList.remove('diasbleBtn');
        })
        if(currentPage === PAGE_LENGTH){
            NEXT_BTN.classList.add('diasbleBtn');
            BTN_LAST_PAGE.classList.add('diasbleBtn');
        }else if (currentPage === 1){
            PREW_BTN.classList.add('diasbleBtn');
            BTN_FIRST_PAGE.classList.add('diasbleBtn');
        }
    }
    const CARD_ARRAY = getCardArr();
    const renderPage = (page) => {
        PAGE_NUM.textContent = page;
        PETS_CONTAINER.innerHTML = '';
        const pageCard = CARD_ARRAY[page-1];
        pageCard.forEach((item)=>{
            const card = createTemplateCard(item);
            PETS_CONTAINER.append(card);
        })
        checkBtnStatus();
    }
    renderPage(currentPage);
    NEXT_BTN.addEventListener('click', () => {
        currentPage++;
        renderPage(currentPage);
    })
    PREW_BTN.addEventListener('click', () => {
        currentPage--;
        renderPage(currentPage);
    })
    BTN_LAST_PAGE.addEventListener('click', () => {
        currentPage = PAGE_LENGTH;
        renderPage(currentPage);
    })
    BTN_FIRST_PAGE.addEventListener('click', () => {
        currentPage = 1;
        renderPage(currentPage);
    })

})
