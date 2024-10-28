// Array of predefined quotes
const quotes = [
   "Success is not just about what you accomplish in your life; its about what you inspire others to do. Every day is a new opportunity to make a difference, to challenge yourself, and to grow beyond your limits. Embrace each moment with enthusiasm, and remember that every small step counts towards your larger goals.",
   "Believe in the power of your dreams and the strength within you. Each day brings new challenges and opportunities, so seize them with courage. Remember that the journey is just as important as the destination, and every experience shapes who you are becoming.",
   "The greatest glory in living lies not in never falling, but in rising every time we fall. Life is a series of ups and downs, and its our resilience that defines us. Keep pushing forward, and don’t be afraid to take risks along the way.",
   "Your mindset can change everything. When you focus on positivity and gratitude, you attract good things into your life. Cultivate an attitude of appreciation, and you’ll find that even the smallest moments can bring joy and fulfillment.",
   "Success is a journey, not a destination. It requires dedication, hard work, and a willingness to learn from failures. Stay committed to your goals, and remember that perseverance is key. Celebrate your progress, no matter how small."
];

// Select a random quote from the array
const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// Show the selected level
function showLevel(level) {
  document.querySelectorAll('.level').forEach(el => el.classList.remove('active'));
  document.getElementById('level' + level).classList.add('active');
}

// Display random quote from the array
const renderNewQuote = () => {
  quote = getRandomQuote();
  let arr = quote.split("").map((value) => {
    return "<span class='quote-chars'>" + value + "</span>";
  });
  quoteSection.innerHTML = arr.join("");
};

// Logic for comparing input words with quote
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars = Array.from(quoteChars);

  let userInputChars = userInput.value.split("");

  quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    } else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    } else {
      if (!char.classList.contains("fail")) {
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }

    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });

    if (check) {
      displayResult();
    }
  });
});

// Update Timer on screen
function updateTimer() {
  if (time == 0) {
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}

// Sets timer
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

// End Test
const displayResult = () => {
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + " %";
};

// Start Test
const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

// Combine both functions into one window.onload
window.onload = function() {
  // Mobile popup logic
  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  if (isMobileDevice()) {
    // Show the popup for mobile users
    document.getElementById('mobile-popup').style.display = 'flex';
    
    document.getElementById('agree-btn').onclick = function() {
      document.getElementById('mobile-popup').style.display = 'none';
    };
    
    document.getElementById('not-agree-btn').onclick = function() {
      window.location.href = 'index.html'; // Redirect to the homepage
    };
  }

  // Typing test initialization logic
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
