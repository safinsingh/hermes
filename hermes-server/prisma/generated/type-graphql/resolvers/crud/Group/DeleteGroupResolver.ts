import * as TypeGraphQL from "type-graphql";
import { DeleteGroupArgs } from "./args/DeleteGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class DeleteGroupResolver {
  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: true
  })
  async deleteGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.delete(args);
  }
}
