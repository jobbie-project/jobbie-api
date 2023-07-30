const fs = require("fs");

// Função para ler o arquivo JSON
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error.message);
    return null;
  }
}

// Função para filtrar as repetições do campo "value"
function filterDuplicatesByValue(techStacks) {
  const uniqueTechStacks = [];
  const uniqueValues = new Set();

  techStacks.forEach((techStack) => {
    if (!uniqueValues.has(techStack.value)) {
      uniqueValues.add(techStack.value);
      uniqueTechStacks.push(techStack);
    }
  });

  return uniqueTechStacks;
}

// Caminho para o arquivo JSON
const filePath = "./tech-stacks.json";

// Lê o arquivo JSON
const techStacks = readJsonFile(filePath);

if (techStacks) {
  // Filtra as repetições pelo campo "value"
  const filteredTechStacks = filterDuplicatesByValue(techStacks.techStacks);

  // Imprime as tech stacks únicas
  for (let i = 0; i < filteredTechStacks.length; i++) {
    console.log(filteredTechStacks[i]);
  }
}
