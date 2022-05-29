function copyrightYear() {
  let y = document.getElementById('currentYear');
  y.innerHTML = new Date().getFullYear();
}
copyrightYear()