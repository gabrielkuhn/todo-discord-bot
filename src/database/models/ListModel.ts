import { Document, model, Schema } from 'mongoose'

export interface IListItem {
  item: string
  createdAt: Date
  finishedAt?: Date
  createdBy: string
}

export interface IList extends Document {
  discordId: string
  listItens: IListItem[]
}

const ListItem = new Schema({
  item: String,
  createdAt: Date,
  finishedAt: Date,
  createdBy: String,
})

export const List = new Schema({
  discordId: String,
  listItens: [ListItem],
})

export default model<IList>('list', List)
