// Pomodoro Timer
let timer;
let timeLeft = 25 * 60; // 25 minutes
const timerDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
  if (!timer) {
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft === 0) {
        clearInterval(timer);
        alert('Time’s up! Take a break.');
      }
    }, 1000);
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 25 * 60;
  updateTimer();
});

// Task Tracker
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const pointsDisplay = document.getElementById('points');
let points = 0;

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(li);
      points += 10; // Earn points for completing tasks
      pointsDisplay.textContent = points;
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';
  }
});

// AI-Generated Study Plan
const subjectInput = document.getElementById('subject-input');
const timeInput = document.getElementById('time-input');
const generatePlanButton = document.getElementById('generate-plan');
const studyPlanOutput = document.getElementById('study-plan-output');

generatePlanButton.addEventListener('click', async () => {
  const subject = subjectInput.value.trim();
  const time = timeInput.value.trim();

  if (subject && time) {
    studyPlanOutput.textContent = 'Generating study plan...';
    const prompt = `Create a study plan for ${subject} for ${time} minutes.`;
    const studyPlan = await generateStudyPlan(prompt);
    studyPlanOutput.textContent = studyPlan;
  } else {
    studyPlanOutput.textContent = 'Please enter a subject and time.';
  }
});

async function generateStudyPlan(prompt) {
  const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
  const url = 'https://api.openai.com/v1/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Share Milestones
const shareButton = document.getElementById('share-button');

shareButton.addEventListener('click', () => {
  const milestone = `I just earned ${points} points on my Study Organizer & Timer! 🎉`;
  if (navigator.share) {
    navigator.share({
      title: 'Study Milestone',
      text: milestone,
    });
  } else {
    alert('Sharing is not supported in your browser.');
  }
});