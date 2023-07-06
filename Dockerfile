
FROM denoland/deno:alpine
WORKDIR /app
COPY . .
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["deno" , "task", "prod"]
CMD ["/app/src/server.ts"]



