import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    createAt: Date;
    exipresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    createAt: {type: Date, required: true, default: Date.now},
    exipresAt: {type: Date, default: thirtyDaysFromNow}
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);

export default SessionModel;