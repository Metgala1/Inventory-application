 document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const disabledBtn = document.querySelector(".disabled")
  disabledBtn.onclick(() => {
  alert("HAHA!! DON'T DELETE FROM MY DATABASE BUDDY😎")
})
  const toggleMenu = () => {
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
      backdrop.classList.add('show');
    } else {
      backdrop.classList.remove('show');
      setTimeout(() => (backdrop.style.display = 'none'), 300);
    }
  };

  if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', () => {
      backdrop.style.display = 'block';
      setTimeout(toggleMenu, 10); 
    });
    backdrop.addEventListener('click', toggleMenu);
  }
});

