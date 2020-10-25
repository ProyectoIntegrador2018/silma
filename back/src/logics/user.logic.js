import { AdminModel } from "../models/admin.model";
import { WriterModel } from "../models/writer.model";
import { ReaderModel } from "../models/reader.model";

export async function getUserTypes(userId) {
  const adminPromise = AdminModel.findOne({
    user: userId
  }).populate("role");
  const writerPromise = WriterModel.findOne({
    user: userId
  });
  const readerPromise = ReaderModel.findOne({
    user: userId
  });

  const userTypes = await Promise.all([
    adminPromise,
    writerPromise,
    readerPromise
  ]);

  return userTypes;
}
