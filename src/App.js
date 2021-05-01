import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from 'react';
import NewsCards from './components/newsCards/newsCards';
import wordsToNumbers from 'words-to-numbers';
const alanKey='06a16214f943a579508c01beceda83ad2e956eca572e1d8b807a3e2338fdd0dc/stage'


const App = () => {
  const [newsArticles, setNewsArticles]= useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({command,articles,number})=>{
        if(command === 'newHeadlines'){
          setActiveArticle(-1);
          setNewsArticles(articles);
        }
        else if (command ==='highlight'){
          setActiveArticle((prev)=> prev+1);

        }
        else if (command==='open'){
          //to open a new window 
          const requestedNumber = number.length >2 ? wordsToNumbers(number,{fuzzy:true}):number
          if(requestedNumber > articles.length){
            alanBtn().playText('please try that again');
          }
          else  {
            alanBtn().playText('Opening');
            window.open(articles[requestedNumber-1].url,'_blank');

          }
        }
      },
    });

  },[])

  return (  
    <div  >
      <h1>ALAN AI NEWS APP</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}
 
export default App;