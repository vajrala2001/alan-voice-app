import React from 'react'
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core'
import classNames from 'classnames'

import useStyles from './styles'
const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage},activeArticle,i}) => {
    const classes = useStyles()
    return (
        <Card className={classNames(classes.card,(activeArticle===i)?classes.activeCard:null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage ||'https://p7.hiclipart.com/preview/944/233/117/newspaper-computer-icons-world-news-clip-art-newspaper-display-advertising-thumbnail.jpg'}/>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
                <CardContent variant='body2' color='textSecondary' component='p'>{description}</CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'>Read more</Button>
                <Typography variant='h5' color='textSecondary'>{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard;
