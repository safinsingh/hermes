import * as TypeGraphQL from "type-graphql";
import { DeleteManyGroupArgs } from "./args/DeleteManyGroupArgs";
import { Group } from "../../../models/Group";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";

@TypeGraphQL.Resolver(_of => Group)
export class DeleteManyGroupResolver {
  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyGroupArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.group.deleteMany(args);
  }
}
