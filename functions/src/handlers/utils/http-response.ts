import { z } from 'zod';
import { ERROR_MESSAGES, ErrorCode } from '../../common/error-codes';

export const LambdaResponseSchema = z.object({
  statusCode: z.number(),
  body: z.string().optional(),
});

export type LambdaResponse = z.infer<typeof LambdaResponseSchema>;

type JsonSerializable =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonSerializable }
  | JsonSerializable[];

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const httpResponse = (status: HttpStatus) => ({
  withBody: (body: JsonSerializable): LambdaResponse => ({
    statusCode: status,
    body: JSON.stringify(body),
  }),
  withError: (errorCode: ErrorCode): LambdaResponse => ({
    statusCode: status,
    body: JSON.stringify({ errorCode, message: ERROR_MESSAGES[errorCode] }),
  }),
});
