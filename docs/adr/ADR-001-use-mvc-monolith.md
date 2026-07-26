# Use MVC Monolith

## Status

Accepted

## Context

A training project needs visible request flow.

## Decision

Use one server-rendered Express MVC monolith.

## Alternatives considered

SPA plus API; microservices.

## Consequences

Low operational/cognitive cost and easy tracing; modules must maintain boundaries.
