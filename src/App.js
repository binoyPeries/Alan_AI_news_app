import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from 'react';
import NewsCards from './components/newsCards/newsCards';
import useStyles from './styles.js';
const alanKey='06a16214f943a579508c01beceda83ad2e956eca572e1d8b807a3e2338fdd0dc/stage'


const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles]= useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(()=>{
    alanBtn({
      key:alanKey,
      onCommand:({command,articles})=>{
        if(command === 'newHeadlines'){
          setActiveArticle(-1);
          setNewsArticles(articles);
        }
        else if (command ==='highlight'){
          setActiveArticle((prev)=> prev+1);

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