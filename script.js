






const quoteContainer = document.getElementById('quote-container');

const quoteText = document.getElementById('quote');

const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');

const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');


// Show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading

function complete() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
    
}




// Get quote from API 

async function getQuote() {

    loading();

    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    const proxyURL = 'https://secure-mountain-50937.herokuapp.com/';

    try {
        
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        // If Author is blank, add 'Unknown'
        if(data.quoteAuthor === '') {
            authorText.innerText = 'unknown';
        } else {
            authorText.innerText= data.quoteAuthor;
        }      

        //Reduce font size for long quotes

        if(data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        
        // Stop loader and show the quote
        complete();
    } catch (error) {
        getQuote();
        
    }

}


// Twitter function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// Event listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);




//On Load

getQuote();

