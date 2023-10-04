import './App.css';
import React, { useState, useEffect } from 'react';

const itemsPerPage = 10; // Adjust the number of items per page as needed


function App() {
  const [data, setData] = useState([]);
  const [totalData, settotalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    // Fetch data based on the current page
    const fetchData = async () => {
      try {
        const response = await fetch(`https://aion-ginko.ondigitalocean.app/rebase/list?page=${currentPage}&per_page=${itemsPerPage}`);
        const newData = await response.json();
        setData(newData);
        const response_total = await fetch(`https://aion-ginko.ondigitalocean.app/rebase/list_all`);
        const newDataTotal = await response_total.json();
        settotalData(newDataTotal);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]); // Re-run the effect when the currentPage changes

  const totalPages = Math.ceil(totalData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    // Ensure the new page is within bounds
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Disqus configuration
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://aions.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    (document.head || document.body).appendChild(script);
    // Load Disqus comment count script
    const countScript = document.createElement('script');
    countScript.id = 'dsq-count-scr';
    countScript.src = 'https://aions.disqus.com/embed.js';
    countScript.async = true;
    document.body.appendChild(countScript);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <ul className="item-list">
          {data.map(item => (
            <li key={item.id} className="list-item">
              <div className="item-content">
                <h3 className="title">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h3>
                <p className="introduce">{item.introduce}</p>
              </div>
              <div className="info">
                <span className="author">by {item.author}</span>
                <span className="time">{new Date(item.time).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>


        <div className="pagination">
          <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
          <span className="page-number">Page {currentPage + 1}</span>
          <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
        </div>

        <div id="disqus_thread"></div>

      </header>
    </div>
  );
}

export default App;
