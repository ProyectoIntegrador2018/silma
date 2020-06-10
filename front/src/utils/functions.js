import commonmark from "commonmark";

//Funcion que recibe un string de un escrito completo con formato markdown y devuelve un arreglo con el texto dividido en capitulos
export const readChapters = (document) => {
  //Regex para identificar si una línea es un nuevo capitulo, es decir, es un Heading 1
  var titleChapterRegex = (entry) => /^ {0,3}# [\s\S]*$/.test(entry) || false; 
  var counter = 0;
  var chapters = [];
  var tempChaps = "";
  var lines = document.split("\n");
  for (var line = 0; line < lines.length; line++) {
    var currentLine = lines[line];
    if (titleChapterRegex(currentLine)) {
      counter = counter + 1;
      if (counter > 1) {
        chapters.push(tempChaps);
        tempChaps = "\n";
      }
    }
    tempChaps = tempChaps.concat(currentLine, "\n");
  }
  chapters.push(tempChaps);
  return chapters; //chapters es un arreglo de strings
};

//Funcion que convierte un texto con formato markdown en un texto con formato HTML
export const markdownToHTML = (text) => {
  var readerCM = new commonmark.Parser();
  var writerCM = new commonmark.HtmlRenderer();
  var parsed = readerCM.parse(text);
  return writerCM.render(parsed); // result es un string
};

//Funcion que traduce el status de ingles a español
export const translateStatus = (status) => {
  if (status == "Completed") {
    return "Completado";
  } else if (status == "Rejected") {
    return "Rechazado";
  } else {
    return "Pendiente";
  }
};
