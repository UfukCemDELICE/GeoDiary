# Store Images Outside MongoDB

## Status

Accepted

## Context

Image bytes grow differently from diary records.

## Decision

Persist metadata only; use local generated files in development and durable object storage in production.

## Alternatives considered

Base64/BSON bytes; permanent local disk.

## Consequences

Smaller records and provider replacement seam; lifecycle cleanup and production provider are required.
