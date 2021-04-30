import NewsCard from "./newsCard/newsCard";
import {Grid,Grow,Typography} from '@material-ui/core';
import useStyles from './styles.js';


const NewsCards = ({articles}) => {
    const classes = useStyles();
    return (  
        <div>
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article,i)=>(
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{display:"flex"}}>
                        <NewsCard article={article} index={i}/>
                    </Grid>

                ))}

                </Grid>
                
            </Grow>
            
            
        </div>
    );
}
 
export default NewsCards;