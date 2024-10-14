// script.js
document.getElementById('analyzeButton').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    const wordCount = countWords(text);
    const charCount = countCharacters(text);
    const sentenceCount = countSentences(text);
    
    document.getElementById('wordCount').textContent = `Word Count: ${wordCount}`;
    document.getElementById('charCount').textContent = `Character Count: ${charCount}`;
    document.getElementById('sentenceCount').textContent = `Sentence Count: ${sentenceCount}`;
    
});

function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function countCharacters(text) {
    return text.length;
}

function countSentences(text) {
    return text.split(/[.!?]/).filter(Boolean).length;
}



function countSyllables(text) {
    return text.split(/\s+/).reduce((count, word) => {
        word = word.toLowerCase();
        if (word.length <= 3) return count + 1;
        return count + (word.match(/[aeiouy]{1,2}/g) || []).length;
    }, 0);
}


document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            document.getElementById('textInput').value = text;
            document.getElementById('analyzeButton').click();
        };
        reader.readAsText(file);
    }
});
