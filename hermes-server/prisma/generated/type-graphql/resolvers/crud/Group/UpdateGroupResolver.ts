import * as TypeGraphQL from "type-graphql";
import { UpdateGroupArgs } from "./args/UpdateGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class UpdateGroupResolver {
  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: true
  })
  async updateGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.update(args);
  }
}
