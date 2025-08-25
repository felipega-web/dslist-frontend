const params = new URLSearchParams(location.search);
const listId = Number(params.get('id'));

const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
const categoria = categorias.find((c) => c.id === listId);

document.getElementById('title').textContent =
  'Categoria: ' + (categoria?.name ?? 'Desconhecida');

function renderCards(data) {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';

  data.forEach((game, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index; // posição atual

    // Imagem
    const img = document.createElement('img');
    img.src = game.imgUrl;
    img.alt = game.title;
    img.classList.add('card-img');
    card.appendChild(img);

    // Conteúdo
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

    // Botões de mover
    const controls = document.createElement('div');
    controls.classList.add('card-controls');

    const upBtn = document.createElement('button');
    upBtn.textContent = '⬆️';
    upBtn.onclick = () => moveCard(index, index - 1);

    const downBtn = document.createElement('button');
    downBtn.textContent = '⬇️';
    downBtn.onclick = () => moveCard(index, index + 1);

    controls.appendChild(upBtn);
    controls.appendChild(downBtn);
    card.appendChild(controls);

    cards.appendChild(card);
  });
}

function moveCard(sourceIndex, destinationIndex) {
  if (destinationIndex < 0) return;
  const cardsContainer = document.getElementById('cards');
  const total = cardsContainer.children.length;
  if (destinationIndex >= total) return;

  // Chama API para atualizar no backend
  fetch(
    `https://dslist-production.up.railway.app/lists/${listId}/replacement`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourceIndex: sourceIndex,
        destinationIndex: destinationIndex,
      }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('Erro na API');
      return res.json().catch(() => ({})); // pode não retornar body
    })
    .then(() => {
      // Depois de atualizar no backend, recarregar lista
      loadGames();
    })
    .catch((err) => console.error(err));
}

function loadGames() {
  fetch(`https://dslist-production.up.railway.app/lists/${listId}/games`)
    .then((response) => response.json())
    .then((data) => renderCards(data))
    .catch((error) => console.error('Erro ao carregar jogos:', error));
}

loadGames();
