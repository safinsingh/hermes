import * as TypeGraphQL from "type-graphql";
import { DeleteMessageArgs } from "./args/DeleteMessageArgs";
import { Message } from "../../../models/Message";

@TypeGraphQL.Resolver(_of => Message)
export class DeleteMessageResolver {
  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: true
  })
  async deleteMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteMessageArgs): Promise<Message | null> {
    return ctx.prisma.message.delete(args);
  }
}
