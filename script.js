// ===== Event Logging for Clicks and Page Views =====

// Log a page view event on page load
window.addEventListener('load', function() {
  console.log(new Date().toISOString() + " | view | Page Loaded");
});

// Log all click events on the document
document.addEventListener('click', function(event) {
  let elementDesc = event.target.tagName;
  if (event.target.id) {
    elementDesc += `#${event.target.id}`;
  } else if (event.target.className) {
    elementDesc += `.${event.target.className}`;
  }
  console.log(new Date().toISOString() + " | click | " + elementDesc);
});

// ===== Dark/Light Mode Toggle =====

const modeToggleBtn = document.getElementById("mode-toggle");
modeToggleBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");
  // Change button text based on current mode
  if (document.body.classList.contains("dark")) {
    modeToggleBtn.textContent = "Light Mode";
  } else {
    modeToggleBtn.textContent = "Dark Mode";
  }
});

// ===== Text Analysis for Q3 =====

document.getElementById("analyzeBtn").addEventListener("click", analyzeText);

function analyzeText() {
  let text = document.getElementById("textInput").value;
  
  // Basic counts
  let numLetters = 0, numSpaces = 0, numNewlines = 0, numSpecial = 0;
  for (const char of text) {
    if (/[A-Za-z]/.test(char)) numLetters++;
    if (char === " ") numSpaces++;
    if (char === "\n") numNewlines++;
    if (/[^A-Za-z0-9\s]/.test(char)) numSpecial++;
  }
  
  // Word count based on whitespace
  let wordsArray = text.trim().split(/\s+/).filter(Boolean);
  let numWords = wordsArray.length;
  
  // Tokenize using regex to capture words in lowercase
  let words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Count pronouns (sample list)
  const pronounsList = ["i", "me", "my", "mine", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "we", "us", "our", "ours", "they", "them", "their", "theirs"];
  let pronounCounts = {};
  pronounsList.forEach(p => pronounCounts[p] = 0);
  words.forEach(word => {
    if (pronounCounts.hasOwnProperty(word)) pronounCounts[word]++;
  });
  
  // Count prepositions (sample list)
  const prepositionsList = ["in", "on", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from"];
  let prepCounts = {};
  prepositionsList.forEach(p => prepCounts[p] = 0);
  words.forEach(word => {
    if (prepCounts.hasOwnProperty(word)) prepCounts[word]++;
  });
  
  // Count indefinite articles ("a", "an")
  const articlesList = ["a", "an"];
  let articleCounts = {};
  articlesList.forEach(a => articleCounts[a] = 0);
  words.forEach(word => {
    if (articleCounts.hasOwnProperty(word)) articleCounts[word]++;
  });
  
  // Construct output HTML for the analysis results
  let resultHTML = `<h3>Basic Counts:</h3>`;
  resultHTML += `<p>Letters: ${numLetters}</p>`;
  resultHTML += `<p>Words: ${numWords}</p>`;
  resultHTML += `<p>Spaces: ${numSpaces}</p>`;
  resultHTML += `<p>Newlines: ${numNewlines}</p>`;
  resultHTML += `<p>Special Symbols: ${numSpecial}</p>`;
  
  resultHTML += `<h3>Pronoun Counts:</h3><ul>`;
  pronounsList.forEach(p => resultHTML += `<li>${p}: ${pronounCounts[p]}</li>`);
  resultHTML += `</ul>`;
  
  resultHTML += `<h3>Preposition Counts:</h3><ul>`;
  prepositionsList.forEach(p => resultHTML += `<li>${p}: ${prepCounts[p]}</li>`);
  resultHTML += `</ul>`;
  
  resultHTML += `<h3>Indefinite Articles Counts:</h3><ul>`;
  articlesList.forEach(a => resultHTML += `<li>${a}: ${articleCounts[a]}</li>`);
  resultHTML += `</ul>`;
  
  document.getElementById("analysisResult").innerHTML = resultHTML;
}
