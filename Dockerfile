FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install



FROM node:slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET

ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0" 

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
