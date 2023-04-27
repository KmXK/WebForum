/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation CreateMessage($createMessage: CreateMessageInput!) {\n        createMessage(createMessage: $createMessage) {\n            id\n            text\n            author {\n                id\n                login\n            }\n            creationTime\n        }\n    }\n": types.CreateMessageDocument,
    "\n    #graphql\n    query GetSections {\n        sections {\n            id\n            name\n            author {\n                id\n                login\n            }\n            children {\n                id\n            }\n        }\n    }\n": types.GetSectionsDocument,
    "\n    #graphql\n    query GetSection($id: Int!) {\n        section(id: $id) {\n            id\n            name\n            children {\n                id\n                name\n                description\n                author {\n                    id\n                    login\n                }\n            }\n            topics {\n                id\n                name\n                author {\n                    id\n                    login\n                }\n            }\n        }\n    }\n": types.GetSectionDocument,
    "\n    #graphql\n    query GetTopic($id: String!) {\n        topic(id: $id) {\n            id\n            name\n            messages {\n                id\n                author {\n                    id\n                    login\n                }\n                creationTime\n                isDeleted\n                text\n            }\n        }\n    }\n": types.GetTopicDocument,
    "\n    #graphql\n    mutation DeleteMessage($messageId: String!) {\n        deleteMessage(messageId: $messageId) {\n            id\n            text\n            creationTime\n            isDeleted\n            author {\n                id\n                login\n            }\n        }\n    }\n": types.DeleteMessageDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CreateMessage($createMessage: CreateMessageInput!) {\n        createMessage(createMessage: $createMessage) {\n            id\n            text\n            author {\n                id\n                login\n            }\n            creationTime\n        }\n    }\n"): (typeof documents)["\n    mutation CreateMessage($createMessage: CreateMessageInput!) {\n        createMessage(createMessage: $createMessage) {\n            id\n            text\n            author {\n                id\n                login\n            }\n            creationTime\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    #graphql\n    query GetSections {\n        sections {\n            id\n            name\n            author {\n                id\n                login\n            }\n            children {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetSections {\n        sections {\n            id\n            name\n            author {\n                id\n                login\n            }\n            children {\n                id\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    #graphql\n    query GetSection($id: Int!) {\n        section(id: $id) {\n            id\n            name\n            children {\n                id\n                name\n                description\n                author {\n                    id\n                    login\n                }\n            }\n            topics {\n                id\n                name\n                author {\n                    id\n                    login\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetSection($id: Int!) {\n        section(id: $id) {\n            id\n            name\n            children {\n                id\n                name\n                description\n                author {\n                    id\n                    login\n                }\n            }\n            topics {\n                id\n                name\n                author {\n                    id\n                    login\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    #graphql\n    query GetTopic($id: String!) {\n        topic(id: $id) {\n            id\n            name\n            messages {\n                id\n                author {\n                    id\n                    login\n                }\n                creationTime\n                isDeleted\n                text\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetTopic($id: String!) {\n        topic(id: $id) {\n            id\n            name\n            messages {\n                id\n                author {\n                    id\n                    login\n                }\n                creationTime\n                isDeleted\n                text\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    #graphql\n    mutation DeleteMessage($messageId: String!) {\n        deleteMessage(messageId: $messageId) {\n            id\n            text\n            creationTime\n            isDeleted\n            author {\n                id\n                login\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation DeleteMessage($messageId: String!) {\n        deleteMessage(messageId: $messageId) {\n            id\n            text\n            creationTime\n            isDeleted\n            author {\n                id\n                login\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;