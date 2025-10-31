// Espera o DOM carregar antes de rodar o código
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("itemForm");
  const gallery = document.getElementById("itemsGallery");

  // Carrega os itens salvos (caso tenha algum no localStorage)
  let items = JSON.parse(localStorage.getItem("achadosEvoItems")) || [];

  // Função para atualizar o mural
  function atualizarMural() {
    gallery.innerHTML = "";
    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("item-card");

      card.innerHTML = `
        <img src="${item.imagem}" alt="Item" />
        <h3>${item.nome}</h3>
        <p><strong>Descrição:</strong> ${item.descricao}</p>
        <p><strong>Local:</strong> ${item.local}</p>
        <p><strong>Data:</strong> ${item.data}</p>
        <button class="delete-btn" data-index="${index}">🗑️ Apagar</button>
      `;

      gallery.appendChild(card);
    });

    // Função de apagar item
    const botoesExcluir = document.querySelectorAll(".delete-btn");
    botoesExcluir.forEach(botao => {
      botao.addEventListener("click", (e) => {
        const i = e.target.getAttribute("data-index");
        items.splice(i, 1);
        localStorage.setItem("achadosEvoItems", JSON.stringify(items));
        atualizarMural();
      });
    });
  }

  // Ao enviar o formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("itemName").value;
    const descricao = document.getElementById("itemDescription").value;
    const local = document.getElementById("itemLocation").value;
    const data = document.getElementById("itemDate").value;
    const imagemInput = document.getElementById("itemImage");

    if (!imagemInput.files.length) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const leitor = new FileReader();
    leitor.onload = function(evento) {
      const novoItem = {
        nome,
        descricao,
        local,
        data,
        imagem: evento.target.result
      };

      items.push(novoItem);
      localStorage.setItem("achadosEvoItems", JSON.stringify(items));
      atualizarMural();
      form.reset();
    };

    leitor.readAsDataURL(imagemInput.files[0]);
  });

  // Atualiza mural ao carregar
  atualizarMural();
});
