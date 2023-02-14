import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "30e4d2289a2f4abf85a7c49ae175f38e";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=${API_KEY}`
      );
      setArticles(result.data.articles.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="news__title">News</h2>
      {articles.map((article, index) => (
        <div key={index} style={{ display: "flex", marginBottom: 20 }}>
          <a href={article.url} target="_blank">
            <img
              src={article.urlToImage}
              alt={article.title}
              style={{ width: 100, height: 50, marginRight: 20 }}
            />
          </a>
          <div style={{ color: "white" }}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;