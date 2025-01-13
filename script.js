document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('goal-form');
    const sectionsList = document.getElementById('sections-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const sectionName = document.getElementById('section-name').value;
        const sceneCount = parseInt(document.getElementById('scene-count').value);

        addSection(sectionName, sceneCount);

        form.reset();
    });

    function addSection(name, totalScenes) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="progress">
                <span>${name} (${totalScenes} scenes)</span>
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
            </div>
            <div>
                <button class="increment">+1 Scene</button>
                <button class="decrement">-1 Scene</button>
                <span class="count">0/${totalScenes}</span>
            </div>
        `;

        const progressBarFill = li.querySelector('.progress-bar-fill');
        const countDisplay = li.querySelector('.count');
        const incrementButton = li.querySelector('.increment');
        const decrementButton = li.querySelector('.decrement');

        let currentScenes = 0;

        // Increment scene count
        incrementButton.addEventListener('click', () => {
            if (currentScenes < totalScenes) {
                currentScenes++;
                updateProgress();
            }
        });

        // Decrement scene count
        decrementButton.addEventListener('click', () => {
            if (currentScenes > 0) {
                currentScenes--;
                updateProgress();
            }
        });

        // Update progress bar and text
        function updateProgress() {
            countDisplay.textContent = `${currentScenes}/${totalScenes}`;
            progressBarFill.style.width = `${(currentScenes / totalScenes) * 100}%`;
        }

        sectionsList.appendChild(li);
    }
});
