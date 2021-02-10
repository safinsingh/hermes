import * as TypeGraphQL from "type-graphql";
import { Group } from "../../../models/Group";
import { Message } from "../../../models/Message";
import { User } from "../../../models/User";
import { GroupMessagesArgs } from "./args/GroupMessagesArgs";
import { GroupUsersArgs } from "./args/GroupUsersArgs";

@TypeGraphQL.Resolver(_of => Group)
export class GroupRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [User], {
    nullable: false,
    description: "Users within the group"
  })
  async users(@TypeGraphQL.Root() group: Group, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: GroupUsersArgs): Promise<User[]> {
    return ctx.prisma.group.findUnique({
      where: {
        id: group.id,
      },
    }).users(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Message], {
    nullable: false,
    description: "Messages sent within the group"
  })
  async messages(@TypeGraphQL.Root() group: Group, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: GroupMessagesArgs): Promise<Message[]> {
    return ctx.prisma.group.findUnique({
      where: {
        id: group.id,
      },
    }).messages(args);
  }
}
