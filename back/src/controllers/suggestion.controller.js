import { ReaderModel } from "@/models/reader.model";
import { SuggestionModel } from "@/models/suggestion.model";
import { TextModel } from "@/models/text.model";
import { sendEmail } from "@/utils/mailSender";
import { send } from "@/utils/errors";
import { UserModel } from "@/models/user.model";

//Asigna X cantindad de lectores a un libro
export const assignReaders = async (text, amount) => {
  var resultsAlgorithm = await runAlgorithm(text);
  resultsAlgorithm = resultsAlgorithm.sort((a, b) =>
    a.points < b.points ? 1 : -1
  );
  var selectedReaders = resultsAlgorithm.slice(0, amount);
  await addSuggestionSendEmail(selectedReaders, text);
};

//Función que agrega la sugerencia para un libro a un arreglo de lectores, además se envia un correo
export const addSuggestionSendEmail = async (selectedReaders, text) => {
  for (const reader of selectedReaders) {
    var suggetionObj = {
      reader: reader.id,
      text: text._id,
      sentDate: new Date(),
      suggestionStatus: "Pending",
      score: reader.points
    };
    await SuggestionModel.create(suggetionObj);
    var readerInfo = await ReaderModel.findById(reader.id).populate("user");
    var plazoLectura;
    if (text.numberOfPages > 350) {
      plazoLectura = "cuatro semanas";
    } else {
      plazoLectura = "tres semanas";
    }
    var textEmails = await TextModel.findById(text._id).populate("genres");
    var listGenre = textEmails.genres.map((genre) => genre.name);

    var email = {
      email: readerInfo.user.email,
      subject: "New Silma Reading Suggestion!"
    };
    await sendEmail(email, "new_suggestion", {
      numberOfPages: text.numberOfPages,
      genres: listGenre.join(" ,")
    });
  }
};

//Funcion que ejecuta el algoritmo de asignación para un libro
export const runAlgorithm = async (text) => {
  const readers = await ReaderModel.find().populate("user");
  var resultantReaders = [];
  for (const reader of readers) {
    var genrePoints = await calculateGenrePoints(
      reader.preferences,
      text.genres
    );
    var agePoints = await calculateAgePoints(
      reader.user.birthdate,
      text.ageRange
    );
    var readingPoints = await calculateReadingPoints(reader.readingProficiency);
    var participationPoints = await calculateParticiaptionPoints(
      reader.lastReview
    );
    var betweenDatesPoints = await calculateBetweenDatesPoints(
      reader.readFrom,
      reader.readTill
    );
    var finalPoints =
      genrePoints +
      agePoints +
      readingPoints +
      participationPoints +
      betweenDatesPoints;
    var acceptedRequest = await SuggestionModel.find({
      reader: reader._id,
      suggestionStatus: "Accepted"
    });
    var pendingRequest = await SuggestionModel.find({
      reader: reader._id,
      suggestionStatus: "Pending"
    });
    var completedRequest = await SuggestionModel.find({
      reader: reader._id,
      suggestionStatus: "Completed",
      text: text._id
    });
    if (
      agePoints != 0 &&
      acceptedRequest.length === 0 &&
      pendingRequest.length === 0 &&
      completedRequest.length === 0 &&
      text.writer.toString() != reader._id.toString()
    ) {
      var resultReader = {
        id: reader._id,
        points: finalPoints
      };
      resultantReaders.push(resultReader);
    }
  }
  return resultantReaders;
};

//Funcion que calcula la cantidad de puntos en la regla de generos
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

//Funcion que calcula la cantidad de puntos en la regla de edad
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
  var earnedPoints = 7;
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

//Funcion que calcula la cantidad de puntos en la regla de velocidad de lectura
export const calculateReadingPoints = async (readingProficiency) => {
  if (readingProficiency === "3 or less") {
    return 2;
  } else if (readingProficiency === "4 to 6") {
    return 1;
  } else {
    return 0;
  }
};

//Funcion que calcula la cantidad de puntos a partir de la ultima fecha de participación
export const calculateParticiaptionPoints = async (participationDate) => {
  var todaysDate = new Date();
  var months =
    todaysDate.getMonth() -
    participationDate.getMonth() +
    12 * (todaysDate.getFullYear() - participationDate.getFullYear());
  if (months > 18) {
    return 2;
  } else if (months >= 6 && months <= 18) {
    return 1;
  }
  return 0;
};

//Funcion que calcula la cantidad de puntos a partir de las fechas de disponibilidad del lector
export const calculateBetweenDatesPoints = async (initialDate, finalDate) => {
  var todaysDate = new Date();
  if (todaysDate <= finalDate && todaysDate >= initialDate) {
    return 1;
  } else {
    return 0;
  }
};

//Funcion que modifica el status de la sugerencia de un lector a un libro
export const changeSuggestionStatus = async (
  id,
  newStatus,
  previousStatus,
  session
) => {
  const suggestion = await SuggestionModel.findById(id).populate("text");
  if (!suggestion) throw { error: `Suggestion with id: ${id} not found` };
  if (suggestion.suggestionStatus === previousStatus) {
    suggestion.suggestionStatus = newStatus;
    await SuggestionModel.updateOne(
      { _id: suggestion._id },
      { suggestionStatus: newStatus, ...suggestion._doc },
      { session }
    );
    return suggestion;
  } else {
    throw {
      error: `Suggestion status can't be updated to ${newStatus} when in ${suggestion.suggestionStatus} status`
    };
  }
};

//Funcion que rechaza la sugerencia a un libro por parte de un lector
export const rejectSuggestion = (request, response) => {
  send(response, async (session) => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.findById(id);
    const textPromise = TextModel.findById(suggestion.text);
    const readerPromise = ReaderModel.findById(suggestion.reader);
    const [text, reader] = await Promise.all([textPromise, readerPromise]);
    const user = await UserModel.findById(reader.user);
    await assignReaders(text, 1);
    const newSuggestion = await changeSuggestionStatus(
      id,
      "Rejected",
      "Pending",
      session
    );
    // Update reader rejects in a row
    reader.rejectsInARow++;
    await reader.save({ session });

    // If reader has rejected over five suggestions, send mail
    if (reader.rejectsInARow > 5) {
      const emailData = {
        email: user.email,
        subject: "Rechazo de lecturas"
      };
      await sendEmail(emailData, "reading_rejects", { readerName: user.name });
      console.log(`EMAIL SENT TO USER ${user.name}`);
    }

    return newSuggestion;
  });
};

//Funcion que acepta la sugerencia a un libro por parte de un lector
export const acceptSuggestion = (request, response) => {
  send(response, async (session) => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.findById(id);
    const newSuggestionPromise = changeSuggestionStatus(
      id,
      "Accepted",
      "Pending",
      session
    );
    const readerPromise = ReaderModel.findById(suggestion.reader);
    const [newSuggestion, reader] = await Promise.all([
      newSuggestionPromise,
      readerPromise
    ]);
    // Set rejects in a row to 0
    reader.rejectsInARow = 0;
    await reader.save();
    return newSuggestion;
  });
};

//Funcion que completa la sugerencia a un libro por parte de un lector
export const completeSuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await changeSuggestionStatus(
      id,
      "Completed",
      "Accepted",
      session
    );
    return suggestion;
  });
};

//Funcion que obtiene una sugerencia de un libro para un lector
export const getSuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.findById(id).populate("text");
    return suggestion;
  });
};

//Funcion que obtiene las sugerencias pendientes de un lector
export const getSuggestionFromReader = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.find({
      reader: id,
      suggestionStatus: "Pending"
    });
    return suggestion;
  });
};

//Funcion que obtiene las sugerencias de un lector
export const getAllSuggestionsFromReader = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.find({ reader: id });
    return suggestion;
  });
};

//Funcion que obtiene la sugerencia activa para el lector
export const getSuggestionFromReaderDashboard = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await ReaderModel.find({ user: id });
    const suggestion = await SuggestionModel.find({
      $or: [
        {
          reader: reader,
          suggestionStatus: "Accepted"
        },
        {
          reader: reader,
          suggestionStatus: "Pending"
        }
      ]
    });
    if (suggestion === undefined) return false;
    else return suggestion[0];
  });
};

//Obtiene todas las sugerenicias de un lector para el dashboard
export const getAllSuggestionsFromReaderDashboard = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const reader = await ReaderModel.find({ user: id });
    const suggestions = await SuggestionModel.find({ reader: reader })
    .populate({ 
      path : 'text', 
      populate : { path: 'writer'},
      //WIP
      //select :  '_id genres writer  ageRange title description numberOfPages numberOfChapters -phase -isRejected'
    })
    .populate({ 
      path : 'text',
      populate : { path: 'genres'}
    });
    //WIP
    //select :  '_id genres writer  ageRange title description numberOfPages numberOfChapters -phase -isRejected'
    //WIP
    //, { genres: 1, writer: 1, phase: 0 ,isRejected: 0 , ageRange: 1, title: 1,description: 1,numberOfPages: 1, numberOfChapters: 1}

    return suggestions;
  });
};

//Obtiene todas las sugerencias de un texto
export const getTextSuggestions = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.find({ text: id }).populate(
      "text"
    );
    return suggestion;
  });
};

//Funcion que permite la creación de sugerencias de un Admin
export const createSuggestionAdmin = (request, response) => {
  send(response, async () => {
    try {
      var reader = [{ id: request.body.reader_id, points: 25 }];
      var text = {
        _id: request.body.book_id,
        numberOfPages: request.body.numberOfPages
      };
      await addSuggestionSendEmail(reader, text);
      return { status: "success" };
    } catch (err) {
      return err;
    }
  });
};

//Obtiene los lectores que no cuentan con sugerencia para asignar a un libro
export const getReadersWithoutSuggestion = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    var text = await TextModel.findById(id);
    var textWriter = [{ reader: text.writer }];
    var completedBooks = await SuggestionModel.find({
      suggestionStatus: "Completed",
      text: id
    });
    var acceptedRequest = await SuggestionModel.find({
      suggestionStatus: "Accepted"
    });
    var pendingRequest = await SuggestionModel.find({
      suggestionStatus: "Pending"
    });
    var readers = await ReaderModel.find()
      .populate("user")
      .populate("preferences");
    var occupiedReaders = [
      ...acceptedRequest,
      ...pendingRequest,
      ...completedBooks,
      ...textWriter
    ];
    var idOccupied = [];
    occupiedReaders.forEach((element) => {
      idOccupied.push(element.reader.toString());
    });
    var finalArr = readers.filter(function (item) {
      return idOccupied.indexOf(item._id.toString()) === -1;
    });
    return finalArr;
  });
};

//Elimina una sugerencia para un libro si el admin lo desea
export const deleteSuggestionAdmin = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    SuggestionModel.findOne({ _id: id }).deleteOne().exec();
  });
};

//Obtiene el feedback dado por el lector en una sugerencia
export const getSuggestionForFeedback = (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = await SuggestionModel.findById(id);
    return suggestion;
  });
};

//Modifica la cantidad de capitulo que un lector pide para su sugerencia
export const changeReadingChapters = async (request, response) => {
  send(response, async () => {
    const { id } = request.params;
    const suggestion = request.body;
    await SuggestionModel.updateOne(
      { _id: id },
      { readingChapters: suggestion.readingChapters }
    );
    return suggestion;
  });
};
