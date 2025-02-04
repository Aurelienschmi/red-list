# 🐾 Red List Application

This application uses the IUCN Red List API to provide information about endangered animals by country.

## 🚀 Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Aurelienschmi/red-list
    ```
2. Navigate to the project directory:
    ```sh
    cd red-list
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## 📖 Usage

1. Create a [.env](http://_vscodecontentref_/3) file in the root directory of the project and add your IUCN Red List API key:
    ```properties
    API_KEY=your_api_key_here
    ```
   You can obtain an API key by creating an account on the [IUCN Red List website](https://www.iucnredlist.org/).

2. Start the server:
    ```sh
    node index.js 
    ```
3. Open your browser and go to `http://localhost:3000` to see the application in action.

## 📦 Dependencies

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [EJS](https://ejs.co/) - Embedded JavaScript templating 

## 📜 License

This project is licensed under the ISC License.