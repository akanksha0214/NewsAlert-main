
import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const [articles, setarticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)



 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  {/*constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    } 
  }*/}


  const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //this.setState({ loading: true }); 
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    {/*this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })*/}
    props.setProgress(100);
  }
  
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} -NewsAlert`;
    updateNews();
  },[])


  {/*async componentDidMount() {
    this.updateNews();
    //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //this.setState({loading:true});
    //let data= await fetch(url);
    //let parsedData=await data.json();
    //console.log(parsedData);
    //this.setState({articles:parsedData.articles, 
    //  totalResults: parsedData.totalResults,
    //loading:false})
  }
  const handlePrevClick = async () => {
    console.log("Prev");
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //  let data= await fetch(url);
    //  let parsedData=await data.json();
    //  this.setState({
    //  page:this.state.page-1,
    //  articles: parsedData.articles,
    // loading:false
    //})
    //this.setState({ page: this.state.page - 1 });
    setPage(page-1)
    updateNews();
  }
  const  handleNextClick = async () => {
    console.log("Next");
    //if(!((this.state.page+1 )>Math.ceil(this.state.totalResults/props.pageSize))){
    //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //this.setState({loading:true});
    //let data= await fetch(url);
    //let parsedData=await data.json();
    //this.setState({
    //  page:this.state.page+1,
    // articles: parsedData.articles,
    //loading:false
    // })
    //}
    //this.setState({ page: this.state.page + 1 });
    setPage(page+1)
    updateNews();
  }*/}

  const fetchMoreData = async () => {
    //this.setState({page:this.state.page+1});
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    {/*
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })*/}
  };



  
    return (
      <>
        <h2 className="text-center" style={{ margin: '40px 0px' , marginTop:'90px'}}>NewsAlert - Top {capitalizeFirstLetter(props.category)} headlines</h2>
          {loading && <Spinner/>}
        < InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={< Spinner />}
        >
          <div className="container">
            <div className="row" >
              {/*!this.state.loading && */} {articles.map((elements) => {
                return <div className="col-md-4" style={{ padding: '10px' }} key={elements.url}>
                  <NewsItem title={elements.title ? elements.title.slice(0, 45) : ""} description={elements.description ? elements.description.slice(0, 80) : ""}
                    imageUrl={elements.urlToImage} newUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }

{/*<div className="container d-flex justify-content-between" style={{ padding: '10px' }}>
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>*/}


      News.defaultProps = {
        country: 'in',
        pageSize: '6',
        category: 'general'
      }
      News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }

export default News;
