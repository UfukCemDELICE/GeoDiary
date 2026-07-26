# Use GeoJSON

## Status

Accepted

## Context

Entries need standards-based points and future spatial search.

## Decision

Store GeoJSON Point coordinates as [longitude, latitude] with a 2dsphere index.

## Alternatives considered

Separate lat/lng fields; strings.

## Consequences

Map/database interoperability and future proximity queries; ordering must be taught and validated.
