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

// Função para reordenar e redefinir os ids das tech stacks
function reorderTechStacks(techStacks) {
  const sortedTechStacks = techStacks.sort((a, b) => a.value.localeCompare(b.value));
  const reorderedTechStacks = sortedTechStacks.map((techStack, index) => ({
    id: index + 1,
    value: techStack.value,
  }));
  return reorderedTechStacks;
}

// Caminho para o arquivo JSON
const filePath = "./tech-stacks.json";

// Lê o arquivo JSON
const techStacks = readJsonFile(filePath);

if (techStacks) {
  // Reordena e redefine os ids das tech stacks
  const reorderedTechStacks = reorderTechStacks(techStacks.techStacks);

  // Formata a saída no modelo JSON
  const jsonData = { techStacks: reorderedTechStacks };

  // Converte para JSON formatado
  const formattedJson = JSON.stringify(jsonData, null, 2);

  // Escreve no arquivo de saída
  const outputFilePath = "arquivo_ordenado.json";
  fs.writeFileSync(outputFilePath, formattedJson);

  console.log("Tech stacks reordenadas e ids redefinidos com sucesso.");
}
