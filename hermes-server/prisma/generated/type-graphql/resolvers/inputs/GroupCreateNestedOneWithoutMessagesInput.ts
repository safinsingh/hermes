import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { GroupCreateOrConnectWithoutmessagesInput } from "../inputs/GroupCreateOrConnectWithoutmessagesInput";
import { GroupCreateWithoutMessagesInput } from "../inputs/GroupCreateWithoutMessagesInput";
import { GroupWhereUniqueInput } from "../inputs/GroupWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class GroupCreateNestedOneWithoutMessagesInput {
  @TypeGraphQL.Field(_type => GroupCreateWithoutMessagesInput, {
    nullable: true
  })
  create?: GroupCreateWithoutMessagesInput | undefined;

  @TypeGraphQL.Field(_type => GroupCreateOrConnectWithoutmessagesInput, {
    nullable: true
  })
  connectOrCreate?: GroupCreateOrConnectWithoutmessagesInput | undefined;

  @TypeGraphQL.Field(_type => GroupWhereUniqueInput, {
    nullable: true
  })
  connect?: GroupWhereUniqueInput | undefined;
}
