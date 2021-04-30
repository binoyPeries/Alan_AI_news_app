// Use this sample to create your own voice commands
intent('What does this app do?','What can i do here?',
      reply('This is a news project.'));
// intent('Start a command', (p)=>{
//     p.play({command: 'testcommand'});
// });

const API_KEY = 'f57bcc6c8b5241b3b225e1c56972a0db';
let savedArticles =[];
let letters_reg = "(.*)";
intent(`Give me $(source* ${letters_reg}) highlights`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        NEWS_API_URL += `&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
    }
    console.log(NEWS_API_URL);
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for news from a different source');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) ${p.source.value}.`);
    });
})


//news by term

intent(`what\'s up with $(term* ${letters_reg}) `, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    console.log(p.term.value);
    if(p.term.value) {
        NEWS_API_URL += `&q=${p.term.value}`
    }
    console.log(NEWS_API_URL);
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
    });
})




// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        
        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
        
    });
});