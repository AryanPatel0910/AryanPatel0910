// --------- Q2: Capture Click Events and Page Views ---------

// Utility function to get a formatted current timestamp
function getCurrentTimestamp() {
    return new Date().toLocaleString();
  }
  
  // Event listener to capture all click events on the document
  document.addEventListener('click', function(event) {
    // Determine the type of element clicked
    let elementType = event.target.tagName.toLowerCase();
    console.log(`${getCurrentTimestamp()} , click , ${elementType}`);
  });
  
  // Option: Capture page views (for example, when the page loads)
  window.addEventListener('load', function() {
    console.log(`${getCurrentTimestamp()} , view , page load`);
  });
  
  // --------- Q3: Text Analyzer ---------
  
  // Define lists for tokenization (sample lists—you can expand these as needed)
  const pronouns = ['i', 'me', 'you', 'he', 'she', 'it', 'we', 'they'];
  const prepositions = ['in', 'on', 'at', 'by', 'with', 'about', 'against', 'between', 'into', 'through'];
  const indefiniteArticles = ['a', 'an'];
  
  // Function to analyze the text
  function analyzeText(text) {
    let analysis = {};
    analysis.letters = (text.match(/[A-Za-z]/g) || []).length;
    analysis.words = (text.match(/\b\w+\b/g) || []).length;
    analysis.spaces = (text.match(/ /g) || []).length;
    analysis.newlines = (text.match(/\n/g) || []).length;
    // Special symbols: anything not a letter, number, whitespace, or common punctuation
    analysis.specialSymbols = (text.match(/[^A-Za-z0-9\s\.,!?;:'"-]/g) || []).length;
  
    // Tokenize the text into words for further analysis (convert to lowercase for uniformity)
    let tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Counting tokens in each category
    let counts = {
      pronouns: {},
      prepositions: {},
      indefiniteArticles: {}
    };
  
    // Count occurrences for pronouns
    pronouns.forEach(pronoun => { counts.pronouns[pronoun] = 0; });
    // Count occurrences for prepositions
    prepositions.forEach(prep => { counts.prepositions[prep] = 0; });
    // Count occurrences for indefinite articles
    indefiniteArticles.forEach(article => { counts.indefiniteArticles[article] = 0; });
    
    tokens.forEach(token => {
      if (pronouns.includes(token)) counts.pronouns[token]++;
      if (prepositions.includes(token)) counts.prepositions[token]++;
      if (indefiniteArticles.includes(token)) counts.indefiniteArticles[token]++;
    });
    
    return { analysis, counts };
  }
  
  // Function to display the analysis results on the page
  function displayResults(results) {
    const resultsDiv = document.getElementById('analysisResults');
    resultsDiv.innerHTML = `
      <h3>Text Analysis Results:</h3>
      <p><strong>Letters:</strong> ${results.analysis.letters}</p>
      <p><strong>Words:</strong> ${results.analysis.words}</p>
      <p><strong>Spaces:</strong> ${results.analysis.spaces}</p>
      <p><strong>Newlines:</strong> ${results.analysis.newlines}</p>
      <p><strong>Special Symbols:</strong> ${results.analysis.specialSymbols}</p>
      <h4>Token Counts:</h4>
      <h5>Pronouns</h5>
      <pre>${JSON.stringify(results.counts.pronouns, null, 2)}</pre>
      <h5>Prepositions</h5>
      <pre>${JSON.stringify(results.counts.prepositions, null, 2)}</pre>
      <h5>Indefinite Articles</h5>
      <pre>${JSON.stringify(results.counts.indefiniteArticles, null, 2)}</pre>
    `;
  }
  
  // Attach event listener to the analyze button
  document.getElementById('analyzeButton').addEventListener('click', function() {
    const text = document.getElementById('inputText').value;
    if (text.length < 10000) {
      alert("Please enter text with more than 10000 words for analysis.");
      return;
    }
    const results = analyzeText(text);
    displayResults(results);
  });
  