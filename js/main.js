function toggleJobDetails(button) {
    const details = button.nextElementSibling;
    const originalText = button.textContent.trim();

    if (details.style.display === 'none') {
        details.style.display = 'block';
        button.innerHTML = '<i class="fa-solid fa-chevron-up"></i> ' + originalText;
        button.classList.add('expanded');
    } else {
        details.style.display = 'none';
        button.innerHTML = '<i class="fa-solid fa-chevron-down"></i> ' + originalText;
        button.classList.remove('expanded');
    }
}