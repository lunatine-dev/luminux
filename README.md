# Luminux Monorepo

## Overview
This repository contains the core infrastructure for the Luminux ecosystem.

## Repository Structure
- **[services/api](./services/api)**: Fastify backend handling authentication, the Twitch bot, and the central Socket.io server.
- **[services/overwolf](./services/overwolf)**: Overwolf native application responsible for catching real-time game events and forwarding them to the backend.
- **[services/frontend](./services/frontend)**: SvelteKit application housing the user dashboard and the dynamic stream overlay.