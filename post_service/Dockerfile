FROM openjdk:17

# Set timezone
ENV TZ="Brazil/East"

WORKDIR /app
COPY ./dist/post_service-0.0.1-SNAPSHOT.jar /app

EXPOSE 8080

# Start the API
ENTRYPOINT ["java", "-jar", "post_service-0.0.1-SNAPSHOT.jar"]
