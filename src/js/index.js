// This function will automaticly update year at the footer
const footerYear = () => {
    // Selecting span element with class .year
    const yearElement = document.querySelector('.year');
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date);
    yearElement.textContent = `${year}/${month.slice(4,7)}`
};
// For updating year and month
footerYear();

// This function will create elements and add classes and attributes for every item in a list
const createElements = (item) => {
    //Create li HTML element
    let listItem = document.createElement('li');

    // Adding class .li to style it like other elements that were made in Html
    listItem.classList.add('li');

    // li element have div component with the class card
    let divItem = document.createElement('div');
    divItem.classList.add('card');

    // First child of divItem
    let cardImg = document.createElement('div');
    cardImg.classList.add('card-img');

    // Child of card image div
    img = document.createElement('img');

    // Setting the image attribute
    img.setAttribute('src', 'https://via.placeholder.com/300x100');
    cardImg.appendChild(img);

    // Second child of divItem
    let cardUnder = document.createElement('div');
    cardUnder.classList.add('card_under-img');

    // Second child od card componend have 3 child element:
    // h3 that is the heading of card component
    let h3 = document.createElement('h3');
    h3.classList.add('img__post');

    // Adding small function that will trim the title to only 3 words
    h3.textContent = trimCaption(item.title);
    // paragraph that is the text in card component
    let paragraph = document.createElement('p');
    paragraph.classList.add('img__p');
    paragraph.textContent = item.body;

    // Button that is the Show more button i car component
    let button = document.createElement('button');
    button.classList.add('img__button');
    button.textContent = 'Show More';

    // Appending 3 element childs of under image card component (h3,paragraph and button)
    cardUnder.appendChild(h3);
    cardUnder.appendChild(paragraph);
    cardUnder.appendChild(button);
    // Appedind 2 elements to the card component
    divItem.appendChild(cardImg);
    divItem.appendChild(cardUnder);
    // Appending card component to a li HTML element
    listItem.appendChild(divItem);
    // Appending li HTML element to a ul HTML element
    list.appendChild(listItem);
}
// This function will trim caption after third word
const trimCaption = (caption) => {
    let firstThreeWords = caption.split(' ', 3);
    let toString = firstThreeWords.join(' ');
    return toString;
}
let array = [];
const list = document.querySelector('.main-ul');
// Sending http request to get data from JSONPlaceholder API
const getPosts = async (url) => {
    let response = await fetch(url);
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error('UpsSomething went wrong');
    }
}
// Data that we recive
getPosts('https://jsonplaceholder.typicode.com/posts')
    .then(data => {
        // Get only first five elements of a data that we recived
        const firstFive = data.filter(item => item.id <= 5);
        //For each item in array  
        firstFive.forEach(item => {
            // This function will make an item that will be shown in HTML
            createElements(item);
        });
        // Returning new promise
        return getPosts('https://jsonplaceholder.typicode.com/comments');
    }).then(data => {
        let firstFive = data.filter(item => item.id <= 5);
        let button = document.querySelectorAll('.img__button');
        firstFive.forEach(user => {
            // For each button clicked
            button.forEach(btn => {
                btn.addEventListener('click', function (event) {
                    let targetedElement = event.target;
                    deleteImage(targetedElement);
                });
            });
        });
    }) //Catch any errors
    .catch(error => {
        console.error(error);
    });

// This function will delete Image element and change some functionality with buttom 
function deleteImage(element) {
    let grandParent = element.parentElement.parentElement;

    // If element does not contains class .open change elements classes and implement some functionality
    if (!grandParent.classList.contains('open')) {
        grandParent.classList.add('open');
        grandParent.children[0].children[0].removeAttribute('src');
        element.textContent = 'Show Less';

        // If element does contains class .open change elements classes and implement some functionality reversing the past if statement
    } else if (grandParent.classList.contains('open')) {
        grandParent = element.parentElement.parentElement;
        grandParent.classList.remove('open');
        grandParent.children[0].children[0].setAttribute('src', "https://via.placeholder.com/300x100");
        element.textContent = 'Show More';
    }
}


 






