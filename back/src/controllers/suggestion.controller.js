import { ReaderModel } from "@/models/reader.model";
import { SuggestionModel } from "@/models/suggestion.model";
import { TextModel } from "@/models/text.model";
import { sendEmail } from "@/utils/mailSender";
import { send } from "@/utils/errors";

export const assignReaders = async (text, amount) => {
  var resultsAlgorithm = await runAlgorithm(text);
  resultsAlgorithm = resultsAlgorithm.sort((a, b) => (a.points < b.points) ? 1 : -1);
  var selectedReaders = resultsAlgorithm.slice(0, amount);
  await addSuggestionSendEmail(selectedReaders, text);
};

export const addSuggestionSendEmail = async (selectedReaders, text) => {
  for (const reader of selectedReaders) {
    var suggetionObj = {
      "reader": reader.id,
      "text": text._id,
      "sentDate": new Date(),
      "suggestionStatus": "Pending",
      "score": reader.points
    }
    await SuggestionModel.create(suggetionObj);
    var readerInfo = await ReaderModel.findById(reader.id).populate("user");
    var plazoLectura;
    if (text.numberOfPages > 350) {
      plazoLectura = "cuatro semanas";
    } else {
      plazoLectura = "tres semanas";
    }
    var textEmails = await TextModel.findById(text._id).populate("genres");
    var listGenre = textEmails.genres.map(genre => genre.name);

    var email = {
      "email": readerInfo.user.email,
      "subject": "New Silma Reading Suggestion!",
      "text": "",
      "html":
        `
                <div>
                    <div>¡Hola!</div>
                    <div>
                    Te agradecemos por haber rellenado nuestro formulario para ser un lector beta. Actualmente tenemos un libro que es de uno de los géneros que te agrada y quisiéramos saber si tienes la oportunidad de leerlo. Tiene ${text.numberOfPages} páginas y es de ${listGenre.join(" ,")}.
                    </div>
                    <div>
                    No es obligatorio leerlo todo pero, si crees que no vas a tener tiempo para leer este libro, ¡no te preocupes! Seguirás en nuestra lista para cuando lo tengas para otra obra.
                    </div>
                    <div>
                    De momento, vamos a explicarte el proceso que debe hacerse como lector beta:
                    </div>
                    <div>
                    <ul>
                        <li>Debes primero firmar una hoja de confidencialidad para que el libro que leas esté seguro.</li>
                        <li>Tómate tu tiempo y reserva un lugar tranquilo en el que puedas leer sin interrupciones.</li>
                        <li>Abre el texto y léelo como cualquier otro libro. Disfrútalo, no pienses en cosas técnicas, sino en la historia.</li>
                        <li>Se deben leer cinco capítulos o cincuenta páginas. Aunque sientas que el texto es pesado o no te guste, debemos dar la oportunidad al escritor de conocer bien su historia.</li>
                        <li>Si para las primeras cincuenta páginas o cinco capítulos la obra no te gustó, puedes detenerte. Después de avisarnos, se te mandará una encuesta de salida, donde se te pedirá tu opinión sobre el libro y en el que podrás comentar qué te gustó y qué te desagradó, esto para darle luego al escritor una crítica constructiva.</li>
                        <li>Si la novela te está gustando, ¡puedes proseguir, incluso acabártela! Solo recuerda que, para la fecha que te indiquemos, debes decir en el formulario que te mandemos qué te gustó, si crees que debería publicarse y por qué.</li>
                    </ul>
                    </div>
                    <div>
                    Ya que se te ha explicado el proceso, ¿te agradaría recibir el libro para revisarlo? El plazo es de ${plazoLectura} para leer lo mínimo necesario (50 páginas o 5 capítulos). Puedes terminarlo luego, si gustas.
                    Por favor, sea cual sea tu respuesta, contesta a este mensaje para asegurarnos que te llegó. Si respondes que sí puedes leer la obra, te mandaremos un documento junto con la ficha a llenar después de la lectura. Si no, te agredeceremos y quedarás de nuevo en la lista de lectores beta para otra ocasión.
                    </div>
                    <div>   
                    ¡Esperamos que tengas un buen día y quedamos al pendiente de tu respuesta!
                    </div>
                    <div>
                    **Por cuestiones de agilizar el proceso y darle un buen servicio a los participantes de nuestra convocatoria, solicitaremos los servicios de otros lectores beta si este mensaje no es respondido en el plazo de dos semanas**
                    </div>
                    <div>
                    Recuerda actualizar tus fechas de disponibilidad de lectura!
                    </div>
                    </span>
                </div>
            `,
    }
    await sendEmail(email);
  }
}

export const runAlgorithm = async (text) => {
  const readers = await ReaderModel.find().populate("user");
  var resultantReaders = []
  for (const reader of readers) {
    var genrePoints = await calculateGenrePoints(reader.preferences, text.genres);
    var agePoints = await calculateAgePoints(reader.user.birthdate, text.ageRange);
    var readingPoints = await calculateReadingPoints(reader.readingProficiency);
    var participationPoints = await calculateParticiaptionPoints(reader.lastReview);
    var betweenDatesPoints = await calculateBetweenDatesPoints(reader.readFrom, reader.readTill);
    var finalPoints = genrePoints + agePoints + readingPoints + participationPoints + betweenDatesPoints;
    var acceptedRequest = await SuggestionModel.find({ reader: reader._id, suggestionStatus: "Accepted" })
    var pendingRequest = await SuggestionModel.find({ reader: reader._id, suggestionStatus: "Pending" })
    if (agePoints != 0 && acceptedRequest.length === 0 && pendingRequest.length === 0) {
      var resultReader = {
        "id": reader._id,
        "points": finalPoints
      }
      resultantReaders.push(resultReader);
    }
  }
  return resultantReaders;
};

export const calculateGenrePoints = async (userGenres, textGenres) => {
  var similar = 0;
  for (const uGenre of userGenres) {
    if (textGenres.includes(uGenre)) {
      similar = similar + 1;
    }
  }
  if (similar === 1) {
    return 2;
  } else if (similar === 2) {
    return 6;
  } else if (similar === 3) {
    return 10;
  } else {
    return 0;
  }
};

export const calculateAgePoints = async (userBirthDate, textYears) => {
  var today = new Date();
  var birthDate = new Date(userBirthDate);
  var UsersAge = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    UsersAge = UsersAge - 1;
  }
  var arr = textYears.split(/-/g);
  if (arr[0] === "18+") {
    var bookMinAge = 18;
    var bookMaxAge = 1000;
  } else {
    var bookMinAge = parseInt(arr[0]);
    var bookMaxAge = parseInt(arr[1]);
  }
  if (UsersAge < bookMinAge) {
    return 0;
  }
  var earnedPoints = 7
  if (UsersAge >= bookMinAge && UsersAge <= bookMaxAge) {
    return earnedPoints;
  }
  for (var i = 3; i >= 0; i--) {
    if (UsersAge <= bookMaxAge || bookMaxAge > 18) {
      return earnedPoints;
    }
    earnedPoints = earnedPoints - 2;
    bookMaxAge = bookMaxAge + 3;
  }
};

export const calculateReadingPoints = async (readingProficiency) => {
  if (readingProficiency === "3 or less") {
    return 2;
  } else if (readingProficiency === "4 to 6") {
    return 1;
  } else {
    return 0;
  }
};

export const calculateParticiaptionPoints = async (participationDate) => {
  var todaysDate = new Date();
  var months = todaysDate.getMonth() - participationDate.getMonth() + (12 * (todaysDate.getFullYear() - participationDate.getFullYear()))
  if (months > 18) {
    return 2;
  } else if (months >= 6 && months <= 18) {
    return 1;
  }
  return 0;
};

export const calculateBetweenDatesPoints = async (initialDate, finalDate) => {
  var todaysDate = new Date()
  if ((todaysDate <= finalDate && todaysDate >= initialDate)) {
    return 1;
  } else {
    return 0;
  }
};

export const changeSuggestionStatus = async (id, newStatus, previousStatus) => {
  const suggestion = await SuggestionModel.findById(id).populate("text");
  if (!suggestion) throw { error: `Suggestion with id: ${id} not found` };
  if (suggestion.suggestionStatus === previousStatus) {
    suggestion.suggestionStatus = newStatus;
    await SuggestionModel.updateOne(
      { _id: suggestion._id },
      { suggestionStatus: newStatus, ...suggestion._doc }
    );
    return suggestion;
  } else {
    throw { error: `Suggestion status can't be updated to ${newStatus} when in ${suggestion.suggestionStatus} status` };
  }
};

export const rejectSuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await changeSuggestionStatus(id, "Rejected", "Pending");
    await assignReaders(suggestion.text, 1);
    return suggestion;
  });
};

export const acceptSuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await changeSuggestionStatus(id, "Accepted", "Pending");
    return suggestion;
  });
};

export const completeSuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await changeSuggestionStatus(id, "Completed", "Accepted");
    return suggestion;
  });
};