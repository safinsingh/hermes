import * as TypeGraphQL from "type-graphql";
import { Group } from "../../../models/Group";
import { Message } from "../../../models/Message";
import { User } from "../../../models/User";

@TypeGraphQL.Resolver(_of => Message)
export class MessageRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Group, {
    nullable: false,
    description: "Group in which the message was sent"
  })
  async group(@TypeGraphQL.Root() message: Message, @TypeGraphQL.Ctx() ctx: any): Promise<Group> {
    return ctx.prisma.message.findUnique({
      where: {
        id: message.id,
      },
    }).group({});
  }

  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false,
    description: "User who sent the message"
  })
  async user(@TypeGraphQL.Root() message: Message, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return ctx.prisma.message.findUnique({
      where: {
        id: message.id,
      },
    }).user({});
  }
}
