// Array of predefined quotes
const quotes = [
  "Success is not merely the achievement of goals; it is also about the journey we take to reach them. Each step we take provides valuable lessons and experiences that shape our character. Embrace challenges as opportunities for growth, and remember that persistence often leads to the most rewarding outcomes. In every setback lies the potential for a comeback, and it is through perseverance that we discover our true strength. Celebrate not only the milestones but also the small victories along the way, as they collectively pave the path to your ultimate success.",
  
  
  "The power of positive thinking can transform your life in remarkable ways. When you approach each day with optimism, you open yourself up to new possibilities and greater happiness. Focus on your strengths, surround yourself with supportive people, and believe that you can achieve anything you set your mind to, no matter the obstacles. By fostering a mindset of gratitude, you create a ripple effect that enhances not only your life but also the lives of those around you. Remember, positivity is contagious, and your attitude can inspire others to adopt a similar outlook on life.",
  

  "Life is full of choices, and each decision we make can have a profound impact on our future. It’s essential to reflect on what truly matters to you and to align your actions with your values. Take the time to set meaningful goals, and remember that every small step taken in the right direction brings you closer to realizing your dreams. The journey toward your aspirations may be winding and filled with uncertainties, but embracing this unpredictability can lead to incredible discoveries about yourself and the world around you. Be open to new experiences, and trust that each choice, whether right or wrong, contributes to your personal growth.",
  

  "Every day presents a new opportunity to learn and grow. Embrace the lessons life teaches you, both through successes and failures. Surround yourself with those who inspire you, and always strive to become the best version of yourself. Remember, it’s not about perfection; it’s about progress and continuous improvement. Acknowledging your flaws and limitations is a sign of strength, and each effort you make to better yourself is a step toward a brighter future. Take time to reflect on your journey, and don’t forget to appreciate the growth you’ve already achieved along the way.",
  

  "True happiness comes from within and is cultivated through gratitude and mindfulness. Take a moment each day to reflect on the things you are thankful for, and practice being present in the moment. This shift in perspective can lead to a more fulfilling life, as you learn to appreciate the beauty in everyday experiences and relationships. Mindfulness encourages you to slow down and engage fully with your surroundings, allowing you to find joy in the simple pleasures. By nurturing this practice, you can create a sense of peace and contentment that empowers you to face life’s challenges with resilience and grace."
];

// Select a random quote from the array
const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 180;
let timer = "";
let mistakes = 0;

// Show the selected level
function showLevel(level) {
  document.querySelectorAll('.level').forEach(el => el.classList.remove('active'));
  document.getElementById('level' + level).classList.add('active');
}

// Optionally, you can add exit behavior here
function exit() {
  alert("Exiting...");
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
  time = 180;
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
    timeTaken = (180 - time) / 100;
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

// Initialize the test when the window loads
window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
