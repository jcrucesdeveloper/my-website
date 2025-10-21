// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const closeMenu = document.getElementById('close-menu');
    
    function closeMenuFunction() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking the X button
    closeMenu.addEventListener('click', closeMenuFunction);
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenuFunction);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            closeMenuFunction();
        }
    });
});

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