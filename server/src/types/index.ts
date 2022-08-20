import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { RouteGenericInterface, RouteHandlerMethod } from "fastify/types/route"
import {
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify/types/utils"

export type RouteHandlerTypebox<TSchema> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>
