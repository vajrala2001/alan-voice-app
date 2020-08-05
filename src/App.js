import React,{useState,useEffect} from 'react'
import alanbtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
import wordsToNumbers from 'words-to-numbers'

import useStyles from './styles'

const alanKey = 'b319362f33f731cc6d0ccbd3048d55ee2e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
    const [newsArticles,setNewsArticles] = useState([])
    const [activeArticle,setActiveArticle] = useState(-1)
    const classes = useStyles()

    useEffect(() => {
        alanbtn({
            key:alanKey,
            onCommand:({command,articles,number}) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                }else if(command === 'open'){
                    const parsedNumber = (number.length > 2)?wordsToNumbers(number,{fuzzy:true}):number

                    if(parsedNumber > 20){
                        alanbtn().playText('Please try that again.')
                    }else{
                        alanbtn().playText('opening...')
                        window.open(articles[parsedNumber-1].url,'_blank')
                        //alanbtn().playText('opening...')
                    } 
                }
            }
        })
    },[])
    return(
        <div>
            <div className = {classes.logoContainer}>
                <img src='https://alan.app/voice/images/previews/preview.jpg' className={classes.alanLogo} alt="Alan AI News" />
            </div>
            <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/>
        </div>
    )
}

export default App