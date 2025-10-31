const form = document.getElementById('itemForm');
const gallery = document.getElementById('itemsGallery');

// Carregar itens salvos
document.addEventListener('DOMContentLoaded', () => {
  const items = JSON.parse(localStorage.getItem('achadosEvo')) || [];
  items.forEach(addItemToGallery);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const description = document.getElementById('itemDescription').value;
  const location = document.getElementById('itemLocation').value;
  const date = document.getElementById('itemDate').value;
  const imageInput = document.getElementById('itemImage');
  const file = imageInput.files[0];

  if (!file) return alert('Por favor, selecione uma imagem.');

  const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result;
    const newItem = { name, description, location, date, imageUrl };

    // Salvar no localStorage
    const items = JSON.parse(localStorage.getItem('achadosEvo')) || [];
    items.push(newItem);
    localStorage.setItem('achadosEvo', JSON.stringify(items));

    addItemToGallery(newItem);
    form.reset();
  };
  reader.readAsDataURL(file);
});

function addItemToGallery(item) {
  const div = document.createElement('div');
  div.classList.add('item-card');
  div.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p><strong>Local:</strong> ${item.location}</p>
    <p><strong>Data:</strong> ${item.date}</p>
  `;
  gallery.appendChild(div);
}
