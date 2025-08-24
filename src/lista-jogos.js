const categorias = document.getElementById('categorias');

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://dslist-production.up.railway.app/lists')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('categorias', JSON.stringify(data));
      data.forEach((categoria) => {
        const option = document.createElement('div');
        option.value = categoria.id;
        option.classList.add('categoria');

        const link = document.createElement('a');
        link.href = `jogo.html?id=${categoria.id}`;
        link.textContent = categoria['name'];
        link.classList.add('link');

        const img = document.createElement('img');
        img.src = `../img/games.svg`;
        img.alt = categoria['name'];
        img.classList.add('img');

        link.appendChild(img);
        option.appendChild(link);
        categorias.appendChild(option);
      });
    });
});
