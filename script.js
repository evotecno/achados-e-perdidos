const form = document.getElementById('itemForm');
const gallery = document.getElementById('itemsGallery');

// Carregar itens salvos no mural
document.addEventListener('DOMContentLoaded', () => {
  const items = JSON.parse(localStorage.getItem('achadosEvo')) || [];
  gallery.innerHTML = '';
  items.forEach(addItemToGallery);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('itemName').value.trim();
  const description = document.getElementById('itemDescription').value.trim();
  const location = document.getElementById('itemLocation').value.trim();
  const date = document.getElementById('itemDate').value;
  const imageInput = document.getElementById('itemImage');
  const file = imageInput.files[0];

  if (!file) {
    alert('Por favor, selecione uma imagem.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result;

    const newItem = { name, description, location, date, imageUrl };
    const items = JSON.parse(localStorage.getItem('achadosEvo')) || [];
    items.push(newItem);

    localStorage.setItem('achadosEvo', JSON.stringify(items));

    addItemToGallery(newItem);
    form.reset();
  };
  reader.readAsDataURL(file);
});

function addItemToGallery(item) {
  const card = document.createElement('div');
  card.classList.add('item-card');
  card.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p><strong>Local:</strong> ${item.location}</p>
    <p><strong>Data:</strong> ${item.date}</p>
  `;
  gallery.appendChild(card);
}
