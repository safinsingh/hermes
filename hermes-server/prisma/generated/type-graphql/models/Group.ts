import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { Message } from "../models/Message";
import { User } from "../models/User";

/** Overarching group model */
@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: "Overarching group model"
})
export class Group {
  /** Group ID */
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false,
    description: "Group ID"
  })
  id!: number;

  /** Group name */
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: "Group name"
  })
  name?: string | null;

  /** Users within the group */
  users?: User[];

  /** Messages sent within the group */
  messages?: Message[];
}
