document.addEventListener('DOMContentLoaded', () => {
    const upgradeButtons = document.querySelectorAll('.upgrade-btn');
    const vehicleContainer = document.getElementById('vehicleContainer');
    const levelUpEffect = document.getElementById('levelUpEffect');
    const lootElement = document.getElementById('loot');
    const replenishAllButton = document.getElementById('replenishAll');

    const upgradeCosts = {
        upgradeGasTank: 100,
        upgradeEngine: 150,
        upgradeLuck: 200,
        upgradeCharisma: 250,
        upgradeDiscount: 300,
        upgradePrize: 350
    };

    const upgradeIncrements = {
        upgradeGasTank: 10,
        upgradeEngine: 5,
        upgradeLuck: 1,
        upgradeCharisma: 2,
        upgradeDiscount: 1,
        upgradePrize: 0.1
    };

    function updateStat(statId, increment) {
        const statElement = document.getElementById(statId);
        let currentValue = parseFloat(statElement.textContent);
        let newValue = currentValue + increment;

        if (statId === 'luckStat' || statId === 'discountStat') {
            newValue = Math.min(newValue, 100); // Cap at 100%
            statElement.textContent = newValue.toFixed(0) + '%';
        } else if (statId === 'prizeStat') {
            statElement.textContent = newValue.toFixed(1) + 'x';
        } else {
            statElement.textContent = newValue.toFixed(0);
        }
    }

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');

    function showModal(message) {
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
    }

    function hideModal() {
        modal.classList.add('hidden');
    }

    modalConfirm.addEventListener('click', hideModal);

    upgradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upgradeCost = upgradeCosts[button.id];
            const currentLoot = parseInt(lootElement.textContent);

            if (currentLoot >= upgradeCost) {
                // Deduct loot
                lootElement.textContent = currentLoot - upgradeCost;

                // Show upgrade effect
                levelUpEffect.classList.remove('hidden');
                levelUpEffect.classList.remove('pulse-effect'); // Remove class to reset animation
                void levelUpEffect.offsetWidth; // Trigger reflow
                levelUpEffect.classList.add('pulse-effect');

                // Update stats
                const statId = button.id.replace('upgrade', '').toLowerCase() + 'Stat';
                updateStat(statId, upgradeIncrements[button.id]);

                // Remove the pulse effect after animation
                levelUpEffect.addEventListener('animationend', function removePulse() {
                    levelUpEffect.classList.remove('pulse-effect');
                    levelUpEffect.classList.add('hidden');
                    levelUpEffect.removeEventListener('animationend', removePulse);
                });
            } else {
                showModal('Not enough $LOOT! You need more resources to perform this upgrade.');
            }
        });
    });

    // Add touch support for tooltips
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        upgradeButtons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const tooltip = button.getAttribute('data-tooltip');
                alert(tooltip);
            });
        });
    }

    replenishAllButton.addEventListener('click', () => {
        const heatElement = document.getElementById('heat');
        heatElement.textContent = '0%';
        showModal('All resources replenished!');
    });

    // Create stars
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        starsContainer.appendChild(star);
    }
});
