import * as TypeGraphQL from "type-graphql";
import { Group } from "../../../models/Group";
import { Message } from "../../../models/Message";
import { User } from "../../../models/User";
import { UserGroupsArgs } from "./args/UserGroupsArgs";
import { UserMessagesArgs } from "./args/UserMessagesArgs";

@TypeGraphQL.Resolver(_of => User)
export class UserRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Message], {
    nullable: false,
    description: "List of all messages a user has sent"
  })
  async messages(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserMessagesArgs): Promise<Message[]> {
    return ctx.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    }).messages(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Group], {
    nullable: false,
    description: "List of all groups a user is part of"
  })
  async groups(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserGroupsArgs): Promise<Group[]> {
    return ctx.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    }).groups(args);
  }
}
