// Faz requisição à API
fetch(`https://dslist-production.up.railway.app/games`)
  .then((response) => response.json())
  .then((data) => {
    const cards = document.getElementById('cards');
    cards.innerHTML = '';

    data.forEach((game) => {
      const card = document.createElement('div');
      card.classList.add('card');
      cards.appendChild(card);

      const img = document.createElement('img');
      img.src = `${game.imgUrl}`;
      img.alt = game.title;
      img.classList.add('card-img');
      card.appendChild(img);

      const content = document.createElement('div');
      content.classList.add('card-content');
      card.appendChild(content);

      const titulo = document.createElement('h2');
      titulo.textContent = `${game.title} - ${game.year}`;
      titulo.classList.add('card-title');
      content.appendChild(titulo);

      const descricao = document.createElement('p');
      descricao.textContent = game.shortDescription;
      descricao.classList.add('card-description');
      content.appendChild(descricao);
    });
  })
  .catch((error) => {
    console.error('Erro ao carregar jogos:', error);
  });
