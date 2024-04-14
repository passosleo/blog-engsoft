import { Post } from "./Post";

const postsTI = [
  {
    category: "Front-End",
    tittle: "Introdução ao Desenvolvimento Front-End",
    content: "<h2>O que é Front-End?</h2><p>O desenvolvimento front-end lida com a parte visual e interativa de um site ou aplicativo. Envolve a criação de interfaces de usuário que os usuários veem e interagem diretamente.</p><h2>Tecnologias Fundamentais</h2><ul><li>HTML (Hypertext Markup Language)</li><li>CSS (Cascading Style Sheets)</li><li>JavaScript</li></ul><h2>Recursos Adicionais</h2><p>Aqui estão alguns recursos úteis para começar:</p><ul><li><a href='https://www.w3schools.com/html/'>W3Schools HTML Tutorial</a></li><li><a href='https://www.freecodecamp.org/'>freeCodeCamp</a></li></ul>",
    author: "Laisla Passos",
    publishedAt: new Date("2024-01-01 08:13:30"),
  },
  {
    category: "Back-End",
    tittle: "APIs RESTful: O que são e como funcionam",
    content: "<h2>O que são APIs RESTful?</h2><p>As APIs RESTful são um conjunto de princípios de arquitetura que determinam como as redes de computadores devem ser organizadas e como os sistemas devem comunicar uns com os outros.</p><h2>Características Principais</h2><ul><li>Baseado em HTTP</li><li>Stateless (Sem Estado)</li><li>Uso de URIs (Identificadores de Recursos Uniformes)</li></ul><h2>Exemplo de Implementação</h2><p>Veja como criar uma simples API RESTful usando Node.js e Express:</p><ul><li><a href='https://www.digitalocean.com/community/tutorials/how-to-build-and-set-up-a-node-js-api'>DigitalOcean Tutorial: How To Build and Set Up a Node.js API</a></li></ul>",
    author: "Leo Passos",
    publishedAt: new Date("2024-03-10 08:13:30"),
  },
  {
    category: "DevOps",
    tittle: "Implementando CI/CD com Jenkins",
    content: "<h2>O que é CI/CD?</h2><p>CI/CD (Integração Contínua / Entrega Contínua) é uma prática de desenvolvimento de software em que as alterações de código são automaticamente testadas e preparadas para implantação em um ambiente de produção.</p><h2>Jenkins</h2><p>O Jenkins é uma ferramenta popular para automação de CI/CD. Ele oferece uma variedade de plugins e uma interface amigável para configurar pipelines de integração e entrega.</p><h2>Como Implementar com Jenkins</h2><p>Veja como configurar um pipeline de CI/CD para um projeto de exemplo usando Jenkins:</p><ul><li><a href='https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/'>Jenkins Tutorial: Build a Node.js and React app with npm</a></li></ul>",
    author: "Ray Melo",
    publishedAt: new Date("2024-03-11 08:13:30"),
  }
];

export function Posts(){
  return (
    <div>
      {postsTI.map((post, index) => (
        <Post key={index} post={post} /> 
      ))}
    </div>
  )
}