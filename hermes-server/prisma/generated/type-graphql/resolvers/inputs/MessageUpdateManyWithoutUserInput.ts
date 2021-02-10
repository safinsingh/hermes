import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { MessageCreateOrConnectWithoutuserInput } from "../inputs/MessageCreateOrConnectWithoutuserInput";
import { MessageCreateWithoutUserInput } from "../inputs/MessageCreateWithoutUserInput";
import { MessageScalarWhereInput } from "../inputs/MessageScalarWhereInput";
import { MessageUpdateManyWithWhereWithoutUserInput } from "../inputs/MessageUpdateManyWithWhereWithoutUserInput";
import { MessageUpdateWithWhereUniqueWithoutUserInput } from "../inputs/MessageUpdateWithWhereUniqueWithoutUserInput";
import { MessageUpsertWithWhereUniqueWithoutUserInput } from "../inputs/MessageUpsertWithWhereUniqueWithoutUserInput";
import { MessageWhereUniqueInput } from "../inputs/MessageWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true
})
export class MessageUpdateManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [MessageCreateWithoutUserInput], {
    nullable: true
  })
  create?: MessageCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageCreateOrConnectWithoutuserInput], {
    nullable: true
  })
  connectOrCreate?: MessageCreateOrConnectWithoutuserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpsertWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  upsert?: MessageUpsertWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  connect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  set?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  disconnect?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageWhereUniqueInput], {
    nullable: true
  })
  delete?: MessageWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateWithWhereUniqueWithoutUserInput], {
    nullable: true
  })
  update?: MessageUpdateWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageUpdateManyWithWhereWithoutUserInput], {
    nullable: true
  })
  updateMany?: MessageUpdateManyWithWhereWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MessageScalarWhereInput], {
    nullable: true
  })
  deleteMany?: MessageScalarWhereInput[] | undefined;
}
