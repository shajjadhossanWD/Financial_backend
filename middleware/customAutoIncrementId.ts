import mongoose, { Document, Model, Schema } from "mongoose";

// Create a schema to store last assigned IDs
interface ICounter extends Document {
  model: string;
  field: string;
  count: number;
  startAt: number;
}

const counterSchema = new Schema<ICounter>({
  model: String,
  field: String,
  count: Number,
  startAt: Number,
});

// Creating a model for the counter schema
const Counter: Model<ICounter> = mongoose.model("Counter", counterSchema);

// Creating a function to get the next ID
async function getNextId(
  modelName: string,
  fieldName: string,
  startAt: number = 100,
  prefix: string = ""
): Promise<string> {
  const counter = await Counter.findOneAndUpdate(
    { model: modelName, field: fieldName },
    { $inc: { count: 1 } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return `${prefix}${startAt + counter.count}`;
}

const customAutoIncrementId = function (
  fieldName: string,
  startAt: number,
  prefix: string = ""
) {
  return async function (this: any, next: () => void) {
    if (!this[fieldName]) {
      this[fieldName] = await getNextId(
        this.constructor.modelName,
        fieldName,
        startAt,
        prefix
      );
    }
    next();
  };
};

export default customAutoIncrementId;
