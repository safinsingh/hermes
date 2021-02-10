import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateGroupArgs } from "./args/AggregateGroupArgs";
import { CreateGroupArgs } from "./args/CreateGroupArgs";
import { DeleteGroupArgs } from "./args/DeleteGroupArgs";
import { DeleteManyGroupArgs } from "./args/DeleteManyGroupArgs";
import { FindFirstGroupArgs } from "./args/FindFirstGroupArgs";
import { FindManyGroupArgs } from "./args/FindManyGroupArgs";
import { FindUniqueGroupArgs } from "./args/FindUniqueGroupArgs";
import { UpdateGroupArgs } from "./args/UpdateGroupArgs";
import { UpdateManyGroupArgs } from "./args/UpdateManyGroupArgs";
import { UpsertGroupArgs } from "./args/UpsertGroupArgs";
import { Group } from "../../../models/Group";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateGroup } from "../../outputs/AggregateGroup";

@TypeGraphQL.Resolver(_of => Group)
export class GroupCrudResolver {
  @TypeGraphQL.Query(_returns => Group, {
    nullable: true
  })
  async group(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindUniqueGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.findUnique(args);
  }

  @TypeGraphQL.Query(_returns => Group, {
    nullable: true
  })
  async findFirstGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Group], {
    nullable: false
  })
  async groups(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyGroupArgs): Promise<Group[]> {
    return ctx.prisma.group.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: false
  })
  async createGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateGroupArgs): Promise<Group> {
    return ctx.prisma.group.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: true
  })
  async deleteGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: true
  })
  async updateGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateGroupArgs): Promise<Group | null> {
    return ctx.prisma.group.update(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async deleteManyGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyGroupArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.group.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
    nullable: false
  })
  async updateManyGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyGroupArgs): Promise<AffectedRowsOutput> {
    return ctx.prisma.group.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Group, {
    nullable: false
  })
  async upsertGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertGroupArgs): Promise<Group> {
    return ctx.prisma.group.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateGroup, {
    nullable: false
  })
  async aggregateGroup(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateGroupArgs): Promise<AggregateGroup> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          // remove __typename and others
          .filter(([key, value]) => !key.startsWith("__"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.group.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
