import NewsCard from "./newsCard/newsCard";
import {Grid,Grow,Typography} from '@material-ui/core';
import useStyles from './styles.js';

const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me BBC news highlights' },
  ];

const NewsCards = ({articles,activeArticle}) => {
    const classes = useStyles();
    //if no artiles
    if(!articles.length){
        return(
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {infoCards.map((info)=>(
                        <Grid className={classes.infoCard} item xs={12} sm={6} md={4} lg={3} style={{display:"flex"}}>
                            <div className={classes.card} style={{background: info.color}}>
                                <Typography  variant="h5"> {info.title}</Typography>

                                {info.info ? 
                                (<Typography variant="h6">
                                    <strong>{info.title.split(' ')[2]}</strong> 
                                    <br/>
                                    {info.info}
                                </Typography>)
                                : null
                                }

                                <Typography variant="h7" > Try Saying: {info.text}</Typography>
                            </div>
                        </Grid>
                    ))}
                    
                </Grid>
                
            </Grow>

        );
    }
    else{
        return (  
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article,i)=>(
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{display:"flex"}}>
                        <NewsCard article={article} index={i} activeArticle={activeArticle}/>
                    </Grid>

                ))}

                </Grid>
                
            </Grow>
            
    );

    }
    
}
 
export default NewsCards;