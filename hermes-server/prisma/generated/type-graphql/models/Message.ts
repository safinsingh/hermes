import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { Group } from "../models/Group";
import { User } from "../models/User";

/** Overarching message model */
@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: "Overarching message model"
})
export class Message {
  /** Message ID */
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false,
    description: "Message ID"
  })
  id!: number;

  /** Message content */
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: "Message content"
  })
  text!: string;

  /** Group in which the message was sent */
  group?: Group;

  /** Unique group identifier */
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false,
    description: "Unique group identifier"
  })
  groupId!: number;

  /** User who sent the message */
  user?: User;

  /** Unique user identifier */
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false,
    description: "Unique user identifier"
  })
  userId!: number;

  /** Time at which message was sent */
  @TypeGraphQL.Field(_type => Date, {
    nullable: false,
    description: "Time at which message was sent"
  })
  timestamp!: Date;
}
