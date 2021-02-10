import * as TypeGraphQL from "type-graphql";
import { CreateGroupArgs } from "./args/CreateGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class CreateGroupResolver {
  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: false
  })
  async createGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateGroupArgs): Promise<Group> {
    return ctx.prisma.group.create(args);
  }
}
