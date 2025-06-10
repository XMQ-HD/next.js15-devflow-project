import { Schema, Types, models, model } from "mongoose";

export interface IModel {}

const ModelSchema = new Schema<IModel>({}, { timestamps: true });

const Model = models?.Account || model<IModel>("Account", ModelSchema);

export default Model;
