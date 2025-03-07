document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ App Loaded!');

    // Logout Confirmation
    const logoutBtn = document.querySelector('a[href="/logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            if (!confirm("Are you sure you want to log out?")) {
                e.preventDefault();
            }
        });
    }
});
