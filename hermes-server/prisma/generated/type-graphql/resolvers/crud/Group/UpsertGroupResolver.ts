import * as TypeGraphQL from "type-graphql";
import { UpsertGroupArgs } from "./args/UpsertGroupArgs";
import { Group } from "../../../models/Group";

@TypeGraphQL.Resolver(_of => Group)
export class UpsertGroupResolver {
  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: false
  })
  async upsertGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertGroupArgs): Promise<Group> {
    return ctx.prisma.group.upsert(args);
  }
}
