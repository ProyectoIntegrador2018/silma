export const readChaptersNumber = (document) => {
    var titleChapterRegex = (entry) => /^ {0,3}# [\s\S]*$/.test(entry) || false;
    var counter = 0;
    var chapters = []
    var tempChaps = ''
    var lines = document.split("\n");
    for (var line = 0; line < lines.length; line++) {
      var currentLine = lines[line];
      if (titleChapterRegex(currentLine)) {
        counter = counter + 1;
        if (counter > 1) {
            chapters.push(tempChaps)
            tempChaps = ''
        }
      }
      tempChaps = tempChaps.concat(tempChaps,currentLine)
    }
    chapters.push(tempChaps)
    return chapters;
  };
  