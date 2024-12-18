// Dados do cardápio
const lanches = [
    {
        id: 1,
        nome: 'Zibzorb "Batatas" Zipzip',
        preco: 25.90,
        descricao: 'Unidades deliciosas de batatas totalmente mundanas',
        imagem: 'img/zip.jpg',
        categoria: 'lanche'
    },
    {
        id: 2,
        nome: 'Zapzip "X-Alien" Zapzip',
        preco: 32.90,
        descricao: 'Um belo X-Alien com um sabor unico e inconfundivel',
        imagem: 'img/zop.jpg',
        categoria: 'lanche'
    },
    {
        id: 3,
        nome: 'Blorp "Torta" Zapzip',
        preco: 28.90,
        descricao: 'Uma torta de dar agua na boca com um sabor unico ',
        imagem: 'img/blop.jpg',
        categoria: 'lanche'
    },
    {
        id: 4,
        nome: 'Zibzorb "Burger" Zipzip',
        preco: 35.90,
        descricao: 'Um Hamburguer que vai te levar para o espaço e vai te fazem ascender como especie',
        imagem: 'img/blep.webp',
        categoria: 'lanche'
    },
   
];

const bebidas = [
    {
        id: 7,
        nome: 'Blorp zap "Plasma" Zapzip',
        preco: 12.90,
        descricao: 'Bebida brilhante verde com gelo seco - 350ml',
        imagem: 'img/zub.jpg',
        categoria: 'bebida'
    },
    {
        id: 8,
        nome: 'Guarana Jesus',
        preco: 14.90,
        descricao: 'Refrigerante Sagrado - 400ml',
        imagem: 'img/jesus.jpg',
        categoria: 'bebida'
    },
    {
        id: 9,
        nome: 'Coca Cola',
        preco: 11.90,
        descricao: 'Sabor unico e inconfundivel - 300ml',
        imagem: 'img/download.jpg',
        categoria: 'bebida'
    },
    {
        id: 10,
        nome: 'Blorp "Nectar de Marte',
        preco: 13.90,
        descricao: 'O sabor de marte, tenha uma experiencia unica interplanetaria - 400ml',
        imagem: 'img/zap.jpg',
        categoria: 'bebida'
    }
];

// Estado da aplicação
const estado = {
    carrinho: [],
    carrinhoAberto: false
};

// Funções de renderização
function renderizarMenu() {         
    const lanchesGrid = document.getElementById('lanches-grid');
    const bebidasGrid = document.getElementById('bebidas-grid');

    lanchesGrid.innerHTML = lanches.map(item => criarItemMenu(item)).join('');
    bebidasGrid.innerHTML = bebidas.map(item => criarItemMenu(item)).join('');
}

function criarItemMenu(item) {
    return `
        <div class="menu-item">
            <img src="${item.imagem}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <p class="price">R$ ${item.preco.toFixed(2)}</p>
            <button class="add-to-cart" 
                    onclick="adicionarAoCarrinho(${item.id}, '${item.categoria}')">
                Adicionar ao Carrinho
            </button>
        </div>
    `;
}

// Funções do carrinho
function adicionarAoCarrinho(id, categoria) {
    const item = categoria === 'lanche' 
        ? lanches.find(l => l.id === id)
        : bebidas.find(b => b.id === id);
        
    if (item) {
        estado.carrinho.push({ ...item });
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');

    cartItems.innerHTML = estado.carrinho.map((item, index) => `
        <div class="cart-item">
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${index})" class="remove-item">X</button>
        </div>
    `).join('');

    const total = estado.carrinho.reduce((sum, item) => sum + item.preco, 0);
    cartTotal.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    cartCount.textContent = estado.carrinho.length;
}

function removerDoCarrinho(index) {
    estado.carrinho.splice(index, 1);
    atualizarCarrinho();
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    estado.carrinhoAberto = !estado.carrinhoAberto;
    cartModal.style.display = estado.carrinhoAberto ? 'block' : 'none';
}

function finalizarPedido() {
    if (estado.carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = estado.carrinho.reduce((sum, item) => sum + item.preco, 0);
    alert(`Pedido finalizado com sucesso!\nTotal: R$ ${total.toFixed(2)}`);
    estado.carrinho = [];
    atualizarCarrinho();
    toggleCart();
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    renderizarMenu();
    document.getElementById('cart-modal').style.display = 'none';
}); 

// Dropdown Mobile
const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdown = document.querySelector('.dropdown');

if (window.innerWidth <= 768) {
    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
}

// Fechar dropdown ao clicar em um link
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Fecha o menu mobile e dropdown se estiver aberto
        if (window.innerWidth <= 768) {
            dropdown.classList.remove('active');
            navLinks.classList.remove('active');
        }

        // Calcula a posição considerando o header fixo
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        // Scroll suave até a seção
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Ajuste no link principal do cardápio
document.querySelector('.dropdown-trigger').addEventListener('click', (e) => {
    if (window.innerWidth > 768) {
        e.preventDefault();
        const menuSection = document.querySelector('#menu');
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = menuSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// Atualiza as seções do cardápio no HTML
document.querySelector('#menu').innerHTML = `
    <section id="lanches" class="menu-section">
        <h2 class="section-title">Lanches</h2>
        <div class="menu-grid" id="lanches-grid">
            <!-- Items serão adicionados via JavaScript -->
        </div>
    </section>

    <section id="bebidas" class="menu-section">
        <h2 class="section-title">Bebidas</h2>
        <div class="menu-grid" id="bebidas-grid">
            <!-- Items serão adicionados via JavaScript -->
        </div>
    </section>
`; 