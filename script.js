document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('goal-form');
    const sectionsList = document.getElementById('sections-list');

    // Load saved goals from localStorage when the page loads
    loadGoals();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const sectionName = document.getElementById('section-name').value;
        const sceneCount = parseInt(document.getElementById('scene-count').value);

        addSection(sectionName, sceneCount);

        form.reset();
    });

    function addSection(name, totalScenes, currentScenes = 0) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="progress">
                <span>${name} (${totalScenes} scenes)</span>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${(currentScenes / totalScenes) * 100}%"></div>
                </div>
            </div>
            <div>
                <button class="increment">+1 Scene</button>
                <button class="decrement">-1 Scene</button>
                <span class="count">${currentScenes}/${totalScenes}</span>
            </div>
        `;

        const progressBarFill = li.querySelector('.progress-bar-fill');
        const countDisplay = li.querySelector('.count');
        const incrementButton = li.querySelector('.increment');
        const decrementButton = li.querySelector('.decrement');

        // Increment scene count
        incrementButton.addEventListener('click', () => {
            if (currentScenes < totalScenes) {
                currentScenes++;
                updateProgress();
                saveGoals();
            }
        });

        // Decrement scene count
        decrementButton.addEventListener('click', () => {
            if (currentScenes > 0) {
                currentScenes--;
                updateProgress();
                saveGoals();
            }
        });

        // Update progress bar and text
        function updateProgress() {
            countDisplay.textContent = `${currentScenes}/${totalScenes}`;
            progressBarFill.style.width = `${(currentScenes / totalScenes) * 100}%`;
        }

        sectionsList.appendChild(li);
        saveGoals();
    }

    // Save goals to localStorage
    function saveGoals() {
        const goals = [];
        const items = sectionsList.querySelectorAll('li');

        items.forEach((item) => {
            const sectionName = item.querySelector('.progress span').textContent.split(' (')[0];
            const [currentScenes, totalScenes] = item.querySelector('.count').textContent.split('/').map(Number);
            goals.push({ sectionName, totalScenes, currentScenes });
        });

        localStorage.setItem('writingGoals', JSON.stringify(goals));
    }

    // Load goals from localStorage
    function loadGoals() {
        const savedGoals = localStorage.getItem('writingGoals');
        if (savedGoals) {
            const goals = JSON.parse(savedGoals);
            goals.forEach((goal) => {
                addSection(goal.sectionName, goal.totalScenes, goal.currentScenes);
            });
        }
    }
});
