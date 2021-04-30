import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from 'react';
import NewsCards from './components/newsCards/newsCards';

const alanKey='06a16214f943a579508c01beceda83ad2e956eca572e1d8b807a3e2338fdd0dc/stage'


const App = () => {

  const [newsArticles, setNewsArticles]= useState([]);

  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({command,articles})=>{
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
        }
      },
    });

  },[])

  return (  
    <div >
      <h1>ALAN AI NEWS APP</h1>
      <NewsCards articles={newsArticles}/>
    </div>
  );
}
 
export default App;