let tapCount = 0;
document.getElementById('tap-button').addEventListener('click', () => {
    tapCount++;
    document.getElementById('counter').innerText = `Taps: ${tapCount}`;
});
