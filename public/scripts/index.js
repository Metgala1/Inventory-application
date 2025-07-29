document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');

  const toggleMenu = () => {
    sidebar.classList.toggle('active');
    backdrop.classList.toggle('show');
  };

  if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);
  }
});
