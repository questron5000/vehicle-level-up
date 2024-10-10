document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const gameContainer = document.querySelector('.game-container');
    const displayImage = document.getElementById('displayImage');
    const vehicleBoostsSection = document.querySelector('.vehicle-boosts-section');
    const tabs = document.querySelectorAll('.tab');
    const backgroundSound = document.getElementById('backgroundSound');
    const clickSound = document.getElementById('clickSound');
    const hoverSound = document.getElementById('hoverSound');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const lootElement = document.getElementById('loot');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const loadSound = document.getElementById('loadSound');

    // Hide game container initially
    gameContainer.style.display = 'none';

    startButton.addEventListener('click', startGame);

    function startGame() {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'flex';
        initAudio();
        initializeGame();
    }

    function initAudio() {
        backgroundSound.volume = volumeSlider.value / 100;
        clickSound.volume = volumeSlider.value / 100;
        hoverSound.volume = volumeSlider.value / 100;
        backgroundSound.play().catch(error => console.log('Audio play failed:', error));
        updateVolumeIcon();
    }

    function playClickSound() {
        loadSound.currentTime = 0;
        loadSound.play().catch(error => console.log('Click sound play failed:', error));
    }

    function playHoverSound() {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(error => console.log('Hover sound play failed:', error));
    }

    let crewBoosts = `
        <h2 class="section-title">Crew Boosts</h2>
        <div class="upgrade-grid">
            <button class="upgrade-btn" id="upgradeStealthBoost">
                <div class="left-content">
                    <i class="fas fa-user-ninja"></i>
                    <span>Stealth Boost</span>
                </div>
                <div class="right-content">
                    <span class="price">600</span>
                    <span class="boost">+12%</span>
                </div>
            </button>
            <button class="upgrade-btn" id="upgradeIntelBoost">
                <div class="left-content">
                    <i class="fas fa-brain"></i>
                    <span>Intel Boost</span>
                </div>
                <div class="right-content">
                    <span class="price">800</span>
                    <span class="boost">+18%</span>
                </div>
            </button>
            <button class="upgrade-btn" id="upgradeCombatBoost">
                <div class="left-content">
                    <i class="fas fa-fist-raised"></i>
                    <span>Combat Boost</span>
                </div>
                <div class="right-content">
                    <span class="price">1200</span>
                    <span class="boost">+8%</span>
                </div>
            </button>
        </div>
        <button class="replenish-btn">
            <span>Replenish All</span>
        </button>
    `;

    let vehicleBoosts = vehicleBoostsSection.innerHTML;

    function switchTab(tabName) {
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        if (tabName === 'crew') {
            displayImage.src = 'images/crew.png';
            displayImage.alt = 'Crew';
            vehicleBoostsSection.innerHTML = crewBoosts;
        } else {
            displayImage.src = 'images/vehicle.png';
            displayImage.alt = 'Vehicle';
            vehicleBoostsSection.innerHTML = vehicleBoosts;
        }

        attachUpgradeListeners();
    }

    function attachUpgradeListeners() {
        const upgradeButtons = document.querySelectorAll('.upgrade-btn');
        upgradeButtons.forEach(button => {
            button.addEventListener('click', handleUpgradeClick);
            button.addEventListener('mouseenter', playHoverSound);
        });

        const replenishButton = document.querySelector('.replenish-btn');
        if (replenishButton) {
            replenishButton.addEventListener('click', handleReplenishClick);
            replenishButton.addEventListener('mouseenter', playHoverSound);
        }
    }

    function handleUpgradeClick() {
        playClickSound();
        console.log('Upgrade button clicked:', this.id);
        const upgradeCost = parseInt(this.querySelector('.price').textContent);
        const currentLoot = parseInt(lootElement.textContent.replace(/,/g, ''));

        if (currentLoot >= upgradeCost) {
            const newLoot = currentLoot - upgradeCost;
            lootElement.textContent = newLoot.toLocaleString();

            const boostElement = this.querySelector('.boost');
            const currentBoost = parseInt(boostElement.textContent);
            const newBoost = currentBoost + 5; // Increment by 5%
            boostElement.textContent = `+${newBoost}%`;

            console.log(`Upgraded ${this.id} for ${upgradeCost} loot. New loot: ${newLoot}`);
        } else {
            console.log('Not enough loot for upgrade');
            showModal();
        }
    }

    function handleReplenishClick() {
        playClickSound();
        console.log('Replenish All clicked');
        lootElement.textContent = '1,000';
        console.log('Loot replenished to 1,000');
    }

    function initializeGame() {
        attachUpgradeListeners();
        attachTabListeners();
    }

    function attachTabListeners() {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                playClickSound();
                switchTab(tab.dataset.tab);
            });
            tab.addEventListener('mouseenter', playHoverSound);
        });
    }

    volumeIcon.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', handleVolumeChange);

    function toggleMute() {
        backgroundSound.muted = !backgroundSound.muted;
        loadSound.muted = backgroundSound.muted;
        hoverSound.muted = backgroundSound.muted;
        updateVolumeIcon();
    }

    function handleVolumeChange() {
        const volume = volumeSlider.value / 100;
        backgroundSound.volume = volume;
        loadSound.volume = volume;
        hoverSound.volume = volume;
        backgroundSound.muted = false;
        loadSound.muted = false;
        hoverSound.muted = false;
        updateVolumeIcon();
    }

    function updateVolumeIcon() {
        if (backgroundSound.muted || backgroundSound.volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }

    function showModal() {
        modal.classList.remove('hidden');
    }

    function hideModal() {
        modal.classList.add('hidden');
    }

    modalClose.addEventListener('click', hideModal);
    modalClose.addEventListener('mouseenter', playHoverSound);

    // Initialize the game
    initializeGame();
});

console.log('Script loaded successfully');