import { sendEmail } from "@/utils/mailSender";
import cron from "node-cron";
import { SuggestionModel } from "../models/suggestion.model";
import moment from "moment-timezone";
import { ReaderModel } from "@/models/reader.model";
import { UserModel } from "@/models/user.model";
import { TextModel } from "@/models/text.model";

export function startMailJobs() {
  sendReminderMailToReaders();
}

function sendReminderMailToReaders() {
  cron.schedule("0 0 * * *", async () => {
    try {
      // Suggestions sent two weeks or more ago
      const suggestions = await SuggestionModel.find({
        sentDate: { $lte: moment().subtract(2, "weeks").toDate() },
        suggestionStatus: "Pending"
      });

      if (suggestions.length > 0) {
        const sendMailPromises = suggestions.map(async (x) => {
          const reader = await ReaderModel.findById(x.reader);
          const userPromise = UserModel.findById(reader.user);
          const textPromise = TextModel.findById(x.text);
          const [text, user] = await Promise.all([textPromise, userPromise]);
          const mailData = {
            email: user.email,
            subject: "Recordatorio de lectura"
          };
          await sendEmail(mailData, "reading_remainder", {
            readerName: user.name,
            book: text.title
          });
          console.log(`EMAIL SENT TO ${user.email}`);
        });

        await Promise.all(sendMailPromises);
      } else
        console.log(
          "NO USER WITH SUGGESTIONS NOT READ WITH TWO WEEKS OR MORE."
        );
    } catch (error) {
      console.error(error);
    }
  });
}
