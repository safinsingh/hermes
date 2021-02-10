import * as TypeGraphQL from "type-graphql";
import { UpdateMessageArgs } from "./args/UpdateMessageArgs";
import { Message } from "../../../models/Message";

@TypeGraphQL.Resolver(_of => Message)
export class UpdateMessageResolver {
  @TypeGraphQL.Mutation(_returns => Message, {
    nullable: true
  })
  async updateMessage(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateMessageArgs): Promise<Message | null> {
    return ctx.prisma.message.update(args);
  }
}
