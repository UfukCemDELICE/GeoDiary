# Use Session-Based Authentication

## Status

Accepted

## Context

Google identity must persist securely across requests.

## Decision

Use Passport Google OAuth, Express sessions, and Mongo-backed connect-mongo storage; serialize only user ID.

## Alternatives considered

JWTs; local passwords; memory sessions.

## Consequences

Simple revocation and server control; requires Atlas availability, cookie/CSRF controls.
