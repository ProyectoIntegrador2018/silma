import commonmark from "commonmark";

export const readChapters = (document) => {
  var titleChapterRegex = (entry) => /^ {0,3}# [\s\S]*$/.test(entry) || false;
  var counter = 0;
  var chapters = [];
  var tempChaps = "";
  var lines = document.split("\n");
  for (var line = 0; line < lines.length; line++) {
    var currentLine = lines[line];
    if (titleChapterRegex(currentLine)) {
      console.log(currentLine);
      counter = counter + 1;
      if (counter > 1) {
        chapters.push(tempChaps);
        tempChaps = "\n";
      }
    }
    tempChaps = tempChaps.concat(currentLine, "\n");
  }
  chapters.push(tempChaps);
  return chapters;
};

export const markdownToHTML = (text) => {
  var readerCM = new commonmark.Parser();
  var writerCM = new commonmark.HtmlRenderer();
  var parsed = readerCM.parse(text);
  return writerCM.render(parsed); // result is a String
};

export const translateStatus = (status) =>{
  if(status == "Completed"){
    return "Completado"
  }
  else if(status == "Rejected"){
    return "Rechazado"
  }
  else{
    return "Pendiente"
  }
};