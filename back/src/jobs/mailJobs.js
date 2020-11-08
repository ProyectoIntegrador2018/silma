import { sendEmail } from "@/utils/mailSender";
import cron from "node-cron";
import { SuggestionModel } from "../models/suggestion.model";
import moment from "moment-timezone";
import { ReaderModel } from "@/models/reader.model";
import { UserModel } from "@/models/user.model";

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
        const readersPromises = suggestions.map((x) =>
          ReaderModel.findById(x.reader)
        );
        const readers = await Promise.all(readersPromises);
        const usersPromises = readers.map((x) => UserModel.findById(x.user));
        const users = await Promise.all(usersPromises);

        const mailPromises = users.map(async (x) => {
          const mailData = {
            email: x.email,
            subject: "SUGGESTION NOT READ YET"
          };
          await sendEmail(mailData, "new_suggestion");
          console.log(`EMAIL SENT TO ${x.email}`);
        });

        await Promise.all(mailPromises);
      } else
        console.log(
          "NO USER WITH SUGGESTIONS NOT READ WITH TWO WEEKS OR MORE."
        );
    } catch (error) {
      console.error(error);
    }
  });
}
