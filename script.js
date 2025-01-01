// Gestion du menu burger
document.querySelector('.burger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.burger-menu').classList.remove('active');
        document.querySelector('.navbar').classList.remove('active');
    });
});

// Gestion des filtres avec des boutons
const projectContainer = document.querySelector('.project-container');
const filterButtons = document.querySelectorAll('.filter-button');

// Liste des projets
const projects = [
    {
        title: 'Traiter des données (Décembre 2024)',
        description: 'Dans ce projet j\'ai conçu un site web utilisant HTML, CSS, Python et une base de données CSV pour trier des données et les présenter sous forme de graphiques interactifs. Ce projet a renforcé mes compétences en développement web et en programmation Python tout en m\'apprenant à gérer un projet de manière autonome et à respecter des délais serrés.',
        category: 'programmation',
        image: 'Images/traitement_donnees.jpg',
    },
    {
        title: 'Construction d\'un réseau informatique (Mai 2024)',
        description: 'Dans ce projet, en tant que membre d\'une équipe de trois personnes, j\'ai conçu et déployé un réseau informatique en configurant des VLANs et du trunking pour segmenter le réseau. J\'ai aussi participé à la mise en place de routeurs avec des protocoles de routage statique et dynamique (RIPv2, OSPF), ainsi que les protocoles DNS et DHCP pour la gestion des adresses IP.',
        category: 'reseaux',
        image: 'Images/reseau_creation.jpg',
    },
    {
        title: 'Mise en Place d\'une solution informatique (Juin 2024)',
        description: 'Dans ce projet, mon équipier et moi avons développé une interface homme-machine (IHM) permettant aux particuliers de demander et d\'obtenir des plages d\'adresses IP. Nous avons conçu l\'IHM en PHP et utilisé MySQL pour gérer la base de données.',
        category: 'programmation',
        image: 'Images/IHM.jpg',
        report: 'Rapports/SAE23.pdf'
    },
    {
        title: 'Réalisation d\'une attaque MITM (Juin 2024)',
        description: 'Dans ce projet, mon équipier et moi avons simulé une attaque Man-in-the-Middle (MITM) en utilisant un switch Cisco et trois ordinateurs. Nous avons réalisé une attaque ARP spoofing pour intercepter et manipuler les échanges réseau.',
        category: 'cybersecurite',
        image: 'Images/MITM.jpg',
        report: 'Rapports/SAE24.pdf'
    },
    {
        title: 'Création d\'un Émetteur Talkie-Walkie (Mai 2024)',
        description: 'Nous avons conçu un émetteur talkie-walkie en mesurant et caractérisant les signaux, modulé la voix en fréquence via un oscillateur contrôlé en tension.',
        category: 'telecommunications',
        image: 'Images/TW.jpg',
        report: 'Rapports/SAE22.pdf'
    }
];

// Fonction pour afficher les projets
function displayProjects(category) {
    projectContainer.innerHTML = '';
    const filteredProjects = category === 'all' ? projects : projects.filter(project => project.category === category);

    filteredProjects.forEach((project) => {
        const projectBox = document.createElement('div');
        projectBox.classList.add('project-box');
        projectBox.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;

        if (project.report) {
            const showReportBtn = document.createElement('button');
            showReportBtn.classList.add('show-report-btn');
            showReportBtn.textContent = 'Afficher le rapport';
            showReportBtn.addEventListener('click', function () {
                window.open(project.report, '_blank');
            });
            projectBox.appendChild(showReportBtn);
        }

        if (project.link) {
            const linkButton = document.createElement('button');
            linkButton.classList.add('link-site-btn');
            linkButton.textContent = 'Lien site';
            linkButton.addEventListener('click', function () {
                window.open(project.link, '_blank');
            });
            projectBox.appendChild(linkButton);
        }

        projectContainer.appendChild(projectBox);
    });

    updateFilterButtonCount(category);
}

// Fonction pour mettre à jour le nombre de projets dans chaque bouton
function updateFilterButtonCount(selectedCategory) {
    filterButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        let count = category === 'all' ? projects.length : 
                   projects.filter(project => project.category === category).length;
        
        button.textContent = category === 'all' ? 
            `Tous (${count})` : 
            `${category.charAt(0).toUpperCase() + category.slice(1)} (${count})`;
    });
}

// Afficher tous les projets au démarrage
displayProjects('all');

// Gestion des clics sur les boutons de filtre
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        displayProjects(category);
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Gestion de la navigation active
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});
