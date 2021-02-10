import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { Group } from "../models/Group";
import { Message } from "../models/Message";

/** Individual user */
@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: "Individual user"
})
export class User {
  /** User's ID */
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false,
    description: "User's ID"
  })
  id!: number;

  /** User's email address (unique) */
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: "User's email address (unique)"
  })
  email!: string;

  /** User's nickname or preferred name */
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: "User's nickname or preferred name"
  })
  name!: string;

  /** User's password (hashed with Argon2i) */
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: "User's password (hashed with Argon2i)"
  })
  password!: string;

  /** List of all messages a user has sent */
  messages?: Message[];

  /** List of all groups a user is part of */
  groups?: Group[];
}
