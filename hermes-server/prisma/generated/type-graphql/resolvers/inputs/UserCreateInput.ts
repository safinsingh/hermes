import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateNestedManyWithoutUsersInput } from "../inputs/GroupCreateNestedManyWithoutUsersInput";
import { MessageCreateNestedManyWithoutUserInput } from "../inputs/MessageCreateNestedManyWithoutUserInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class UserCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => MessageCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  messages?: MessageCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateNestedManyWithoutUsersInput, {
    nullable: true
  })
  groups?: GroupCreateNestedManyWithoutUsersInput | undefined;
}
