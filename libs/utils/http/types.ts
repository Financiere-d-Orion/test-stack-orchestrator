import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

export type CustomAPIGatewayProxyEvent<S extends JSONSchema> = Omit<APIGatewayProxyEvent, 'body'> &
  FromSchema<S>;
export type CustomAPIGatewayProxyResult<S extends JSONSchema> = Omit<
  APIGatewayProxyResult,
  'body'
> &
  FromSchema<S>;

export type CustomAPIGatewayProxyHandler<
  InputSchema extends JSONSchema,
  OutputSchema extends JSONSchema,
> = Handler<CustomAPIGatewayProxyEvent<InputSchema>, CustomAPIGatewayProxyResult<OutputSchema>>;
