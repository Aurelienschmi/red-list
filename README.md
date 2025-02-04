# 🐾 Red List Application

Cette application utilise l'API de l'IUCN Red List pour fournir des informations sur les animaux en danger par pays.

## 📑 Table des Matières

1. [🚀 Installation](#-installation)
2. [📖 Usage](#-usage)
3. [📦 Dépendances](#-d%C3%A9pendances)
4. [👤 Auteur](#-auteur)
5. [📜 License](#-license)

## 🚀 Installation

1. Clonez le dépôt :
    ```sh
    git clone https://github.com/Aurelienschmi/red-list
    ```
2. Naviguez dans le répertoire du projet :
    ```sh
    cd red-list
    ```
3. Installez les dépendances :
    ```sh
    npm install
    ```

## 📖 Usage

1. Créez un fichier [.env](http://_vscodecontentref_/3) à la racine du projet et ajoutez votre clé API de l'IUCN Red List :
    ```properties
    API_KEY=your_api_key_here
    ```
   Vous pouvez obtenir une clé API en créant un compte sur le [site de l'IUCN Red List](https://www.iucnredlist.org/).

2. Démarrez le serveur :
    ```sh
    node index.js
    ```
3. Ouvrez votre navigateur et allez sur `http://localhost:3000` pour voir l'application en action.

## 📦 Dépendances

- [Express](https://expressjs.com/) - Framework web rapide, minimaliste et non dogmatique pour Node.js
- [EJS](https://ejs.co/) - Moteur de templating JavaScript intégré

## 👤 Auteur

- **Aurélien Schmieder**  
  [GitHub](https://github.com/Aurelienschmi)
- **Quentin Juskowiak**
  [GitHub](https://github.com/QuentinoDelFuego)
- **Hugo Matyla**
  [GitHub](https://github.com/Fenerz07)
- **Gabriel Balcon**
  [GitHub](https://github.com/Aze667)
- **Maxime Labbe**
  [GitHub](https://github.com/Maxime-Labbe)
- **Alexis Hazebrouck**
  [GitHub](https://github.com/Alexis-aka-Yazm)
- **Charles Belot**
  [GitHub](https://github.com/Charly-miaouu)
- **Mathis Dacacio**
  [GitHub](https://github.com/MathisDacacio)

## 📜 License

Ce projet est sous licence ISC.
