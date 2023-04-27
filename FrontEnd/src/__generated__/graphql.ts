/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
  __typename?: 'Message';
  author: User;
  creationTime: Scalars['String'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  message: Message;
  messages: Array<Message>;
  role: Array<Role>;
  roles: Array<Role>;
  section: Section;
  sections: Array<Section>;
  topic: Topic;
  topics: Array<Topic>;
  user: User;
};


export type QueryMessageArgs = {
  id: Scalars['String'];
};


export type QueryRoleArgs = {
  id: Scalars['Int'];
};


export type QuerySectionArgs = {
  id: Scalars['Int'];
};


export type QueryTopicArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Section = {
  __typename?: 'Section';
  author: User;
  children: Array<Section>;
  creationTime: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  topics: Array<Topic>;
};

export type Topic = {
  __typename?: 'Topic';
  author: User;
  id: Scalars['String'];
  messages: Array<Message>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  login: Scalars['String'];
  role: Role;
  roleName: Role;
};

export type GetSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSectionsQuery = { __typename?: 'Query', sections: Array<{ __typename?: 'Section', id: number, name: string, author: { __typename?: 'User', id: string, login: string }, children: Array<{ __typename?: 'Section', id: number }> }> };

export type GetSectionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetSectionQuery = { __typename?: 'Query', section: { __typename?: 'Section', id: number, name: string, children: Array<{ __typename?: 'Section', id: number, name: string, description?: string | null, author: { __typename?: 'User', id: string, login: string } }>, topics: Array<{ __typename?: 'Topic', id: string, name: string, author: { __typename?: 'User', id: string, login: string } }> } };

export type GetTopicQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTopicQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', id: string, name: string, messages: Array<{ __typename?: 'Message', id: string, creationTime: string, isDeleted: boolean, text: string, author: { __typename?: 'User', id: string, login: string } }> } };


export const GetSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetSectionsQuery, GetSectionsQueryVariables>;
export const GetSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSectionQuery, GetSectionQueryVariables>;
export const GetTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creationTime"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetTopicQuery, GetTopicQueryVariables>;