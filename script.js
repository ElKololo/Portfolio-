// Gestion des filtres avec des boutons
const projectContainer = document.querySelector(".project-container")
const filterButtons = document.querySelectorAll(".filter-button")

// Liste des projets
const projects = [
  {
    title: "Traiter des données (Décembre 2024)",
    description:
      "Dans ce projet j'ai conçu un site web utilisant HTML, CSS, Python et une base de données CSV pour trier des données et les présenter sous forme de graphiques interactifs. Ce projet a renforcé mes compétences en développement web et en programmation Python tout en m'apprenant à gérer un projet de manière autonome et à respecter des délais serrés.",
    category: "programmation",
    image: "Images/traitement_donnees.jpg",
    //link: 'https://www.example.com',  // Lien vers le site du projet(bientôt)
  },
  {
    title: "Construction d'un réseau informatique (Mai 2024)",
    description:
      "Dans ce projet, en tant que membre d'une équipe de trois personnes, j'ai conçu et déployé un réseau informatique en configurant des VLANs et du trunking pour segmenter le réseau. J'ai aussi participé à la mise en place de routeurs avec des protocoles de routage statique et dynamique (RIPv2, OSPF), ainsi que les protocoles DNS et DHCP pour la gestion des adresses IP.",
    category: "reseaux",
    image: "Images/reseau_creation.jpg",
  },
  {
    title: "Mise en Place d'une solution informatique (Juin 2024)",
    description:
      "Dans ce projet, mon équipier et moi avons développé une interface homme-machine (IHM) permettant aux particuliers de demander et d'obtenir des plages d'adresses IP. Nous avons conçu l'IHM en PHP et utilisé MySQL pour gérer la base de données.",
    category: "programmation",
    image: "Images/IHM.jpg",
    report: "Rapports/SAE23.pdf", // Chemin vers le rapport PDF
  },
  {
    title: "Réalisation d'une attaque MITM (Juin 2024)",
    description:
      "Dans ce projet, mon équipier et moi avons simulé une attaque Man-in-the-Middle (MITM) en utilisant un switch Cisco et trois ordinateurs. Nous avons réalisé une attaque ARP spoofing pour intercepter et manipuler les échanges réseau.",
    category: "cybersecurite",
    image: "Images/MITM.jpg",
    report: "Rapports/SAE24.pdf", // Chemin vers le rapport PDF
  },
  {
    title: "Création d'un Émetteur Talkie-Walkie (Mai 2024)",
    description:
      "Nous avons conçu un émetteur talkie-walkie en mesurant et caractérisant les signaux, modulé la voix en fréquence via un oscillateur contrôlé en tension.",
    category: "telecommunications",
    image: "Images/TW.jpg",
    report: "Rapports/SAE22.pdf", // Chemin vers le rapport PDF
  },
  {
    title: "Découvrir le pentest (Janvier 2025)",
    description:
      "J'ai mis en place un hacklab sur VirtualBox, composé de Kali Linux et de deux machines cibles : Metasploitable2 et Windows XP. À l'aide d'outils comme Metasploit, Nessus, Nmap et John The Ripper, j'ai réalisé une simulation de test d'intrusion pour identifier, exploiter des failles et analyser la sécurité des systèmes.",
    category: "cybersecurite",
    image: "Images/pentest_img.jpg",
    report: "Rapports/SAE34.pdf", // Chemin vers le rapport PDF
  },
]

// Fonction pour afficher les projets
function displayProjects(category) {
  projectContainer.innerHTML = "" // Vide le conteneur des projets

  // Filtrer les projets en fonction de la catégorie
  const filteredProjects = category === "all" ? projects : projects.filter((project) => project.category === category)

  // Afficher les projets filtrés
  filteredProjects.forEach((project) => {
    const projectBox = document.createElement("div")
    projectBox.classList.add("project-box")
    projectBox.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `

    // Ajouter un bouton "Afficher le rapport" uniquement si le projet a un rapport
    if (project.report) {
      const showReportBtn = document.createElement("button")
      showReportBtn.classList.add("show-report-btn")
      showReportBtn.textContent = "Afficher le rapport"

      // Ajouter l'événement pour ouvrir le PDF dans un nouvel onglet
      showReportBtn.addEventListener("click", () => {
        window.open(project.report, "_blank") // Ouvre le rapport dans un nouvel onglet
      })

      projectBox.appendChild(showReportBtn) // Ajouter le bouton dans la carte projet
    }

    // Ajouter un bouton "Lien site" uniquement si le projet a un lien
    if (project.link) {
      const linkButton = document.createElement("button")
      linkButton.classList.add("link-site-btn")
      linkButton.textContent = "Lien site"

      // Ajouter l'événement pour rediriger vers le lien dans un nouvel onglet
      linkButton.addEventListener("click", () => {
        window.open(project.link, "_blank") // Ouvre le lien du site dans un nouvel onglet
      })

      projectBox.appendChild(linkButton) // Ajouter le bouton dans la carte projet
    }

    projectContainer.appendChild(projectBox)
  })

  // Met à jour le nombre de projets dans les boutons de filtre
  updateFilterButtonCount(category)
}

// Fonction pour mettre à jour le nombre de projets dans chaque bouton
function updateFilterButtonCount(selectedCategory) {
  filterButtons.forEach((button) => {
    const category = button.getAttribute("data-category")

    // Compter le nombre de projets pour chaque catégorie
    let count = 0
    if (category === "all") {
      count = projects.length // Affiche le total pour "Tous"
    } else {
      count = projects.filter((project) => project.category === category).length
    }

    // Mettre à jour le texte du bouton avec le nombre de projets
    if (category === selectedCategory) {
      button.textContent = `${category === "all" ? "Tous" : category.charAt(0).toUpperCase() + category.slice(1)} (${count})` // Si c'est la catégorie sélectionnée
    } else if (category === "all") {
      button.textContent = `Tous (${count})` // Pour "Tous"
    } else {
      button.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} (${count})` // Pour les autres catégories
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  // Afficher tous les projets au démarrage
  displayProjects("all")

  // Ajouter un événement sur chaque bouton de filtre
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category") // Récupère la catégorie du bouton cliqué

      // Affiche les projets de la catégorie sélectionnée
      displayProjects(category)

      // Met à jour l'état actif des boutons
      filterButtons.forEach((btn) => btn.classList.remove("active")) // Retire la classe active de tous les boutons
      button.classList.add("active") // Ajoute la classe active au bouton cliqué
    })
  })

  // Sélectionner tous les liens de la navigation
  const navLinks = document.querySelectorAll(".nav-link")

  // Ajouter un événement 'click' sur chaque lien
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Retirer la classe 'active' de tous les liens
      navLinks.forEach((link) => link.classList.remove("active"))

      // Ajouter la classe 'active' au lien cliqué
      this.classList.add("active")
    })
  })

  // Gestion du menu hamburger
  const menuToggle = document.querySelector(".menu-toggle")
  const navbar = document.querySelector(".navbar")

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("hidden")
  })
})

// Ajoutez ce code à la fin de votre fichier script.js existant

document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.querySelector(".typewriter")

  setInterval(() => {
    typewriter.style.animation = "none"
    void typewriter.offsetWidth // Déclenche un reflow
    typewriter.style.animation = null
  }, 8000) // Réinitialise l'animation toutes les 8 secondes
})

